import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/utils/logger";
import { devLog } from "@/utils/devLog";
import { sendNotificationEmail } from "@/utils/Emails/send.emails";
import bcrypt from "bcryptjs";

/**
 * @description A function that handles user password reset
 * @param req
 * @returns
 */

export async function PUT(req: NextRequest) {
  const { password, token } = await req.json();
  try {
    //Ensure all fields are filled
    if (!token || !password)
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    //Check if user code is still valid
    const foundUser = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
      },
    });
    if (!foundUser)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired password reset link.",
        },
        { status: 403 }
      );

    const currentDate = new Date(Date.now());
    if (
      foundUser.resetPasswordTokenExpiresAt &&
      foundUser.resetPasswordTokenExpiresAt.getTime() <= currentDate.getTime()
    )
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired password reset link.",
        },
        { status: 403 }
      );

    // update db record
    // hash new password
    const salt = await bcrypt.genSalt(12);
    const newPasswordHash = await bcrypt.hash(password, salt);
    await prisma.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        resetPasswordToken: null,
        resetPasswordTokenExpiresAt: null,
        password: newPasswordHash,
      },
    });

    // Send welcome email
    await sendNotificationEmail(
      `Your email: ${foundUser.email} recently requested for a password reset link.`,
      foundUser?.email as string,
      foundUser?.name as string,
      new Date(Date.now()).toLocaleDateString(),
      foundUser?.name as string,
      {
        "X-Category": "Notification Email",
      }
    );

    //Hide password before sending to frontend
    logger.info(`User ${foundUser.name}, ${foundUser.email} account verified`);

    return NextResponse.json(
      {
        success: true,
        // user: { ...newUser._doc, password: undefined },
        message: "User password reset successful",
      },
      { status: 201 }
    );
  } catch (error) {
    devLog(error);
    logger.error(`Error user password reset failed`);

    return NextResponse.json(
      {
        success: false,
        message: "Error resetting your password. Please try again later.",
      },
      { status: 500 }
    );
  }
}
