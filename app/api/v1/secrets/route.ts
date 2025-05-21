import authConfig from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { logger } from "@/utils/logger";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, content, expiryType, expiryTime, maxViews } = await req.json();
  if (!name || !content || !expiryType) {
    return NextResponse.json(
      { success: false, message: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    // Compute expiresAt...
    let expiresAt: Date | null = new Date();
    if (expiryTime) {
      switch (expiryTime) {
        case "1h":
          expiresAt.setHours(expiresAt.getHours() + 1);
          break;
        case "24h":
          expiresAt.setHours(expiresAt.getHours() + 24);
          break;
        case "7d":
          expiresAt.setDate(expiresAt.getDate() + 7);
          break;
        case "30d":
          expiresAt.setDate(expiresAt.getDate() + 30);
          break;
        case "never":
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);
          break;
      }
    } else {
      expiresAt = null;
    }

    // Find the user by email
    const foundUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Create the secret—just pass userId, drop the User field
    const secret = await prisma.secret.create({
      data: {
        name,
        content,
        expiresAt: expiryType === "views" ? null : expiresAt,
        maxViews: expiryType === "views" ? parseInt(maxViews, 10) : null,
        userId: foundUser.id,
      },
    });

    logger.info(`Secret created for ${session.user.email}`);
    return NextResponse.json({
      success: true,
      message: "Secret created successfully.",
      secret,
    });
  } catch (error: any) {
    logger.error("Error creating user secret", error);
    return new NextResponse(
      "Sorry, an unexpected error occurred creating your secret. Try again later.",
      { status: 500 }
    );
  }
}

// Get user's secrets
export async function GET(_: Request) {
  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(
        "Unauthorized please login into your account to continue",
        { status: 401 }
      );
    }
    // Find the user by email
    const foundUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }
    const secrets = await prisma.secret.findMany({
      where: {
        userId: foundUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!secrets) {
      return NextResponse.json(
        { success: false, message: "User secrets found." },
        { status: 204 }
      );
    }

    return NextResponse.json({
      secrets: secrets,
      success: true,
      message: "Secret retrieved successfully.",
    });
  } catch (error: any) {
    logger.error("Error creating user secret", error.message);

    return new NextResponse(
      "Sorry, an unexpected error occurred getting your secrets.",
      { status: 500 }
    );
  }
}
