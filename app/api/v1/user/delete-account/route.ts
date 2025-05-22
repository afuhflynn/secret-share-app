import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/utils/logger";
import { devLog } from "@/utils/devLog";
import {
  sendAccountDeleteAdminNotificationEmail,
  sendAccountDeleteEmail,
  sendNotificationEmail,
} from "@/utils/Emails/send.emails";
import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";
import { signOut } from "@/lib/auth";

/**
 * @description A function that handles user sign up and account creation
 * @param req
 * @returns
 */

export async function POST(req: NextRequest) {
  const { reason, email } = await req.json();
  const { auth } = NextAuth(authConfig);
  const session = await auth();

  if (!email || !reason) {
    return NextResponse.json(
      {
        success: false,
        message: "All fields are required!",
      },
      { status: 400 }
    );
  }

  if (email.trim() !== session?.user.email?.trim()) {
    return NextResponse.json(
      {
        success: false,
        message: "The email you provided is invalid or incorrect",
      },
      { status: 400 }
    );
  }
  try {
    //Check if user code is still valid
    const foundUser = await prisma.user.findUnique({
      where: {
        email: session?.user.email as string,
        id: session?.user.id as string,
      },
    });

    if (!foundUser)
      return NextResponse.json(
        {
          success: false,
          message: "User session has expired or is invalid!",
        },
        { status: 403 }
      );

    // Delete current user, clear cookies and send emails
    const deletedUser = await prisma.user.delete({
      where: {
        email: foundUser.email as string,
        id: foundUser.id as string,
      },
    });

    if (!deletedUser) {
      logger.error(
        `Error deleting user: ${foundUser.name}, ${foundUser.email}`
      );
      await sendNotificationEmail(
        `We noticed an unsuccessful account deletion attempt for your account with email: ${foundUser.email}`,
        foundUser?.email as string,
        foundUser?.name as string,
        new Date(Date.now()).toLocaleDateString(),
        foundUser?.name as string,
        {
          "X-Category": "Notification Email",
        }
      );
      return NextResponse.json(
        {
          success: false,
          message: "Sorry, an unexpected error occurred updating your password",
        },
        { status: 500 }
      );
    }

    // Send the user a notification email
    await sendAccountDeleteEmail(
      deletedUser?.email as string,
      deletedUser?.username
        ? (deletedUser?.username as string)
        : (deletedUser?.name as string),
      {
        "X-Category": "Account deletion email",
      }
    );

    // Send admin email to notify them of user account deletion
    await sendAccountDeleteAdminNotificationEmail(
      deletedUser.email as string,
      deletedUser?.username
        ? (deletedUser?.username as string)
        : (deletedUser?.name as string),
      reason,
      new Date(Date.now()).toString(),
      {
        "X-Category": "User account deletion",
      }
    );

    //Hide password before sending to frontend
    logger.info(
      `User ${deletedUser.name}, ${deletedUser.email} account deleted`
    );

    // clear cookie and session
    await signOut({ redirect: false, redirectTo: "/" });

    return NextResponse.json(
      {
        success: true,
        message: "User account deleted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    devLog(error);
    logger.error(`Error deleting user account`);

    return NextResponse.json(
      {
        success: false,
        message:
          "Error deleting your account at moment. Please try again later.",
      },
      { status: 500 }
    );
  }
}
