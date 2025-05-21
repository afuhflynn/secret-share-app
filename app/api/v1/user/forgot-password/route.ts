import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/utils/logger";
import { devLog } from "@/utils/devLog";
import { sendPasswordResetEmail } from "@/utils/Emails/send.emails";
import { generateToken } from "@/utils/generate-token";

/**
 * @description A function that handles user sign up and account creation
 * @param req
 * @returns
 */

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  try {
    //Ensure all fields are filled
    if (!email)
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    //Check if user code is still valid
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!foundUser)
      return NextResponse.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 403 }
      );

    // Update db record
    const resetToken = generateToken();
    await prisma.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    // Send the user a notification email
    await sendPasswordResetEmail(
      foundUser?.email as string,
      foundUser?.name as string,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/reset-password/${resetToken}`,
      {
        "X-Category": "Password Reset Email",
      }
    );

    //Hide password before sending to frontend
    logger.info(
      `User ${foundUser.name}, ${foundUser.email} password forgotten attempt granted`
    );

    return NextResponse.json(
      {
        success: true,
        // user: { ...newUser._doc, password: undefined },
        message: "Password reset email sent successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    devLog(error);
    logger.error(`Error sending user reset email`);

    return NextResponse.json(
      {
        success: false,
        message: "Error sending reset email. Please try again later.",
      },
      { status: 500 }
    );
  }
}
