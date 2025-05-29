import authConfig from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { devLog } from "@/utils/devLog";
import { sendNotificationEmail } from "@/utils/Emails/send.emails";
import { logger } from "@/utils/logger";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

// Get a shared secret
export async function GET(
  req: Request,
  { params }: { params: { id: string; token: string } }
) {
  devLog(req);
  const { token, id } = await params;
  if (!id || !token) {
    return NextResponse.json(
      { success: false, message: "Invalid access link." },
      { status: 400 }
    );
  }

  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Grab the share record *and* its secret in one go
    const share = await prisma.share.findUnique({
      where: { token },
      include: { secret: true },
    });
    if (!share || share.secretId !== id) {
      return NextResponse.json(
        { success: false, message: "Invalid secret access link." },
        { status: 404 }
      );
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

    // 1) Make sure this user hasn’t viewed it yet:
    const already = await prisma.shareView.findUnique({
      where: {
        shareId_userId: {
          shareId: share.id,
          userId: foundUser.id,
        },
      },
    });
    if (already) {
      return NextResponse.json(
        { success: false, message: "You’ve already viewed this secret." },
        { status: 403 }
      );
    }

    const { secret } = share;
    const now = new Date();

    // 1) Expiry by date?
    if (share.expiresAt && share.expiresAt <= now) {
      await prisma.share.delete({ where: { id: share.id } });
      return NextResponse.json(
        { success: false, message: "This link has expired." },
        { status: 403 }
      );
    }

    // 2) Expiry by share-views?
    if (share.maxViews && share.views >= share.maxViews) {
      await prisma.share.delete({ where: { id: share.id } });
      return NextResponse.json(
        { success: false, message: "This link has been maxed out." },
        { status: 403 }
      );
    }

    // 3) Expiry by secret-views?
    if (secret.maxViews && secret.currentViews >= secret.maxViews) {
      return NextResponse.json(
        { success: false, message: "Secret no longer available." },
        { status: 403 }
      );
    }

    // 4) All clear—bump both counters in one transaction
    await prisma.$transaction([
      prisma.secret.update({
        where: { id: secret.id },
        data: { currentViews: { increment: 1 } },
      }),
      prisma.share.update({
        where: { id: share.id },
        data: { views: { increment: 1 } },
      }),
      prisma.shareView.create({
        data: {
          shareId: share.id,
          userId: foundUser.id,
        },
      }),
    ]);

    // Notify owner if requested
    const owner = await prisma.user.findUnique({
      where: { id: secret.userId },
    });
    if (
      share.sendAccessEmail &&
      owner?.accessNotifications &&
      owner.emailNotifications
    ) {
      await sendNotificationEmail(
        `Your secret was just accessed by ${session.user.name} (${session.user.email}).`,
        owner.email!,
        owner.username ?? owner.name!,
        now.toLocaleString(),
        `${owner.name}–>${session.user.name}`,
        { "X-Category": "Secret access" }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Secret retrieved successfully.",
      secret,
    });
  } catch (err: any) {
    logger.error("[SHARES_GET]", err);
    return NextResponse.json(
      { success: false, message: "Server error—please try again later." },
      { status: 500 }
    );
  }
}
