import authConfig from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmail } from "@/utils/Emails/send.emails";
import { logger } from "@/utils/logger";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

/**
 * @description This file handles multiple secrets operations (such as deleting multiple secrets)
 */

// Delete user's secrets
export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      {
        success: false,
        message: "Your email is required to perform this action.",
      },
      { status: 400 }
    );
  }
  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(
        "Unauthorized please login into your account to continue",
        { status: 401 }
      );
    }

    if (email.trim() !== session.user.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Provide a correct email.",
        },
        { status: 401 }
      );
    }

    // Verify if the secret belongs to the user
    const foundUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!foundUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login into your account to continue.",
        },
        { status: 404 }
      );
    }

    const secrets = await prisma.secret.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    if (!secrets) {
      logger.error(
        `Error deleting user secrets: ${session.user.name}, ${session.user.email}`
      );
      if (foundUser.emailNotifications) {
        await sendNotificationEmail(
          `We noticed an unsuccessful secrets deletion attempt for your account with email: ${session.user.email}`,
          session.user?.email as string,
          session.user?.name as string,
          new Date(Date.now()).toLocaleDateString(),
          session.user?.name as string,
          {
            "X-Category": "Notification Email",
          }
        );
        return NextResponse.json(
          {
            success: false,
            message: "error deleting secrets.",
          },
          { status: 500 }
        );
      }
    }
    if (foundUser.emailNotifications) {
      await sendNotificationEmail(
        `We noticed an you made a request to delete all of your secrets from our severs for your account with email: ${session.user.email}`,
        session.user?.email as string,
        session.user?.name as string,
        new Date(Date.now()).toLocaleDateString(),
        session.user?.name as string,
        {
          "X-Category": "Notification Email",
        }
      );
    }
    logger.info(
      `User ${session.user.name}, ${session.user.email} secrets deleted successfully`
    );

    return NextResponse.json({
      success: true,
      message: "Secrets deleted successfully.",
    });
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    logger.error(`Error deleting user secrets`, error.message);

    return new NextResponse(
      "Sorry, an unexpected error occurred deleting your secrets.",
      { status: 500 }
    );
  }
}
