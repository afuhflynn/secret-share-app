import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/utils/logger";
import { devLog } from "@/utils/devLog";
import { sendNotificationEmail } from "@/utils/Emails/send.emails";
import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";

/**
 * @description A function that handles user sign up and account creation
 * @param req
 * @returns
 */

export async function PUT(req: NextRequest) {
  const { accessNotifications, marketingEmails, emailNotifications } =
    await req.json();
  const { auth } = NextAuth(authConfig);
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "User session expired or invalid",
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
    const updatedUser = await prisma.user.update({
      where: {
        email: foundUser.email as string,
        id: foundUser.id as string,
      },
      data: {
        emailNotifications,
        accessNotifications,
        marketingEmails,
      },
    });

    if (!updatedUser) {
      logger.error(
        `Error updating user: ${foundUser.name}, ${foundUser.email} email preferences.`
      );
      await sendNotificationEmail(
        `We noticed an unsuccessful account email preferences update for your account with email: ${foundUser.email}`,
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
          message:
            "Sorry, an unexpected error occurred updating your email preferences",
        },
        { status: 500 }
      );
    }

    // Send the user a notification email
    await sendNotificationEmail(
      `Your email: ${updatedUser.email} recently authorized an update of your account email preferences`,
      updatedUser?.email as string,
      updatedUser?.name as string,
      new Date(Date.now()).toLocaleDateString(),
      updatedUser?.name as string,
      {
        "X-Category": "Notification Email",
      }
    );

    //Hide password before sending to frontend
    logger.info(
      `User ${updatedUser.name}, ${updatedUser.email} account email preferences updated`
    );

    return NextResponse.json(
      {
        user: { ...foundUser, password: undefined },
        success: true,
        message: "User account email preferences updated successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    devLog(error);
    logger.error(`Error updating user account email preferences`);

    return NextResponse.json(
      {
        success: false,
        message:
          "Error updating your account at moment. Please try again later.",
      },
      { status: 500 }
    );
  }
}
