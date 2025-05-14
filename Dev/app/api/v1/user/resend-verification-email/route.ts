import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/utils/logger";
import { devLog } from "@/utils/devLog";
import { sendNotificationEmail } from "@/utils/Emails/send.emails";
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
    await prisma.user.update({
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

    //Send welcome email
    await sendNotificationEmail(
      `A new verification email sent to: ${foundUser.email}`,
      foundUser?.email as string,
      foundUser?.name as string,
      new Date(Date.now()).toLocaleDateString(),
      foundUser?.name as string,
      {
        "X-Category": "Notification Email",
      }
    );

    //Hide password before sending to frontend
    logger.info(
      `User ${foundUser.name}, ${foundUser.email} verification email resent`
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
