import authConfig from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { devLog } from "@/utils/devLog";
import { logger } from "@/utils/logger";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

/**
 * @description This file handles single secret operations (such as getting or creating a share link for a shared secret)
 */

// Create a new secret share link
export async function POST(
  req: Request,
  { params }: { params: { id: string; token: string } }
) {
  devLog(req);
  const id = await params.id;
  const { emails, expiryTime, emailNotifications } = await req.json();
  if (!expiryTime) {
    return NextResponse.json(
      { success: false, message: "All fields are required." },
      { status: 400 }
    );
  }
  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // Verify the secret belongs to the user
    const foundUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }
    const secret = await prisma.secret.findUnique({
      where: {
        id: id,
        userId: foundUser.id,
      },
    });

    if (!secret) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Calculate expiration date based on expiryTime
    const expiresAt = new Date();
    if (expiryTime === "1h") {
      expiresAt.setHours(expiresAt.getHours() + 1);
    } else if (expiryTime === "24h") {
      expiresAt.setHours(expiresAt.getHours() + 24);
    } else if (expiryTime === "7d") {
      expiresAt.setDate(expiresAt.getDate() + 7);
    } else if (expiryTime === "30d") {
      expiresAt.setDate(expiresAt.getDate() + 30);
    } else if (expiryTime === "never") {
      // For "never", set a far future date (1 year)
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    }

    // Generate a random token
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // Create the share
    const share = await prisma.share.create({
      data: {
        token,
        secretId: secret.id,
        expiresAt,
        emails: emails ? emails : null,
        sendAccessEmail: emailNotifications ? emailNotifications : null,
      },
    });

    if (!share) {
      return NextResponse.json({
        success: false,
        message: "An unexpected error occurred creating a share link.",
      });
    }

    // Create a new access link for frontend response ui
    const shareLink = `${process.env.NEXT_PUBLIC_CLIENT_URL}/s/${secret.id}/${token}`;

    return NextResponse.json({
      shareUrl: shareLink,
      success: true,
      message: "Share link created successfully",
    });
  } catch (error) {
    logger.error("[SHARES_POST]", error);
    return new NextResponse(
      "There was an error on our site creating the share link. Please try again later.",
      { status: 500 }
    );
  }
}
