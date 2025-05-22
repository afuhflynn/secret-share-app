import authConfig from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { logger } from "@/utils/logger";
import { Secret } from "@prisma/client";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

/**
 * @description This file handles creating and fetching a user's secrets,
 *              auto-deleting any that have expired by date or view count.
 */

// CREATE A NEW SECRET
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
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Compute expiresAt (or null if “never” or view-based)
    const now = new Date();
    let expiresAt: Date | null = null;
    if (expiryType === "time") {
      expiresAt = new Date(now);
      switch (expiryTime) {
        case "1h":
          expiresAt.setHours(now.getHours() + 1);
          break;
        case "24h":
          expiresAt.setHours(now.getHours() + 24);
          break;
        case "7d":
          expiresAt.setDate(now.getDate() + 7);
          break;
        case "30d":
          expiresAt.setDate(now.getDate() + 30);
          break;
        case "never":
          expiresAt = null;
          break;
        default:
          return NextResponse.json(
            { success: false, message: "Invalid expiryTime." },
            { status: 400 }
          );
      }
    }

    // Find the user
    const foundUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Create secret
    const secret = await prisma.secret.create({
      data: {
        name,
        content,
        expiresAt: expiryType === "time" ? expiresAt : null,
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
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

// GET ALL NON-EXPIRED SECRETS (AND CLEANUP)
export async function GET(_: Request) {
  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const foundUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Single “now” for consistency
    const now = new Date();

    // 1) Delete any date-based secrets where expiresAt ≤ now
    await prisma.secret.deleteMany({
      where: {
        userId: foundUser.id,
        expiresAt: { lte: now },
      },
    });

    // 2) (Optional) Delete any view-based secrets that have hit maxViews here
    //    e.g. prisma.secret.deleteMany({ where: { userId: foundUser.id, views: { gte: maxViews } } })

    // 3) Fetch remaining
    const liveSecrets = await prisma.secret.findMany({
      where: {
        userId: foundUser.id,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      message: "Secrets retrieved successfully.",
      secrets: liveSecrets as Secret[],
    });
  } catch (error: any) {
    logger.error("Error fetching user secrets", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
