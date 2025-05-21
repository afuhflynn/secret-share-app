import authConfig from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmail } from "@/utils/Emails/send.emails";
import { logger } from "@/utils/logger";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { expiryTime, emails } = await req.json();

    // Verify the secret belongs to the user
    const secret = await prisma.secret.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
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
        secretId: params.id,
        expiresAt,
        emails: emails ? emails.join(",") : null,
      },
    });

    return NextResponse.json({
      ...share,
      shareUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/s/${params.id}/${token}`,
    });
  } catch (error) {
    console.error("[SHARES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
