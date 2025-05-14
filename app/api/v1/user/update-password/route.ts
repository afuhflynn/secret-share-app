import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/utils/logger";
import { devLog } from "@/utils/devLog";
import { sendNotificationEmail } from "@/utils/Emails/send.emails";
import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";
import { compare, genSalt, hash } from "bcryptjs";

/**
 * @description A function that handles user sign up and account creation
 * @param req
 * @returns
 */

export async function PUT(req: NextRequest) {
  const { password, currentPassword } = await req.json();
  const { auth } = NextAuth(authConfig);
  const session = await auth();
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

    // Check if current password matches the provided current password
    const match = await compare(currentPassword, foundUser.password as string);
    if (!match)
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect current password.",
        },
        { status: 401 }
      );

    // hash provided password
    const salt = await genSalt(12);
    const pwdHash = await hash(password, salt);

    // Update db record
    const updatedUser = await prisma.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        password: password ? pwdHash : foundUser.password,
      },
    });

    if (!updatedUser) {
      logger.error(
        `Error updating user: ${foundUser.name}, ${foundUser.email} user password`
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
    await sendNotificationEmail(
      `Your email: ${updatedUser.email} recently authorized an update of your account password`,
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
      `User ${updatedUser.name}, ${updatedUser.email} account password updated`
    );

    return NextResponse.json(
      {
        success: true,
        user: { ...updatedUser, password: undefined },
        message: "User password updated successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    devLog(error);
    logger.error(`Error updating user account password`);

    return NextResponse.json(
      {
        success: false,
        message: "Error updating your password. Please try again later.",
      },
      { status: 500 }
    );
  }
}
