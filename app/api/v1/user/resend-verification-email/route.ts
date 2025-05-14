import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/utils/logger";
import { devLog } from "@/utils/devLog";
import {
  sendNotificationEmail,
  sendVerificationEmail,
} from "@/utils/Emails/send.emails";
import { generateVerificationCode } from "@/utils/generateCode";
import { generateToken } from "@/utils/generate-token";

/**
 * @description A function that handles user sign up and account creation
 * @param req
 * @returns
 */

export async function PUT(req: NextRequest) {
  const { email } = await req.json();
  try {
    //Ensure all fields are filled
    if (!email)
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    //Check if user with given email exists
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!foundUser)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 403 }
      );

    // Update db record
    const verificationCode = generateVerificationCode();
    const verificationToken = generateToken();
    const updatedUser = await prisma.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        verificationToken,
        verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        verificationCode,
        verificationCodeExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        emailVerified: false,
      },
    });

    //Send verification email
    await sendVerificationEmail(
      updatedUser.verificationCode as string,
      updatedUser.email as string,
      updatedUser.name as string,
      updatedUser.verificationToken as string,
      {
        "X-Category": "Verification Email",
      }
    );

    //Hide password before sending to frontend
    logger.info(
      `User ${updatedUser.name}, ${updatedUser.email} verification email resent`
    );

    return NextResponse.json(
      {
        success: true,
        // user: { ...newUser._doc, password: undefined },
        message: "Verification sent successful",
      },
      { status: 201 }
    );
  } catch (error) {
    devLog(error);
    logger.error(`Error user ${email} verification email resend failed`);

    return NextResponse.json(
      {
        success: false,
        message: "Error sending email. Please try again later.",
      },
      { status: 500 }
    );
  }
}
