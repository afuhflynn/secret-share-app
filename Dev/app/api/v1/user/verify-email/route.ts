import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/utils/logger";
import { devLog } from "@/utils/devLog";
import { sendWelcomeEmail } from "@/utils/Emails/send.emails";

/**
 * @description A function that handles user sign up and account creation
 * @param req
 * @returns
 */

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  try {
    //Ensure all fields are filled
    if (!code)
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    //Check if user code is still valid
    const foundUser = await prisma.user.findFirst({
      where: {
        verificationCode: String(code),
      },
    });
    if (!foundUser)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired verification code.",
        },
        { status: 403 }
      );

    const currentDate = new Date(Date.now());
    if (
      foundUser.verificationCodeExpiresAt &&
      foundUser.verificationCodeExpiresAt.getTime() <= currentDate.getTime()
    )
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired verification code time.",
        },
        { status: 403 }
      );
    // Update db record
    await prisma.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        verificationCode: null,
        verificationCodeExpiresAt: null,
        verificationToken: null,
        verificationTokenExpiresAt: null,
        emailVerified: true,
      },
    });

    //Send welcome email
    await sendWelcomeEmail(
      foundUser?.email as string,
      foundUser?.name as string,
      {
        "X-Category": "Welcome email",
      }
    );

    //Hide password before sending to frontend
    logger.info(`User ${foundUser.name}, ${foundUser.email} account verified`);

    return NextResponse.json(
      {
        success: true,
        // user: { ...newUser._doc, password: undefined },
        message: "Account verification successful",
      },
      { status: 201 }
    );
  } catch (error) {
    devLog(error);
    logger.error(`Error user account verification failed`);

    return NextResponse.json(
      {
        success: false,
        message: "Error verifying your email. Please try again later.",
      },
      { status: 500 }
    );
  }
}
