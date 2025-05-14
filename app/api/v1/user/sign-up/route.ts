import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateVerificationCode } from "@/utils/generateCode";
import bcrypt from "bcryptjs";
import { logger } from "@/utils/logger";
import { devLog } from "@/utils/devLog";
import { sendVerificationEmail } from "@/utils/Emails/send.emails";
import { generateToken } from "@/utils/generate-token";

/**
 * @description A function that handles user sign up and account creation
 * @param req
 * @returns
 */

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  try {
    //Ensure all fields are filled
    if (!email || !name || !password)
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    //Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists)
      return NextResponse.json(
        {
          success: false,
          message: `User email: ${email} is already in use.`,
        },
        { status: 409 }
      );
    //Hash user password
    const verificationCode = generateVerificationCode();
    const verificationToken = generateToken();
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        password: passwordHash,
        email,
        emailNotifications: true,
        marketingEmails: true,
        verificationToken,
        verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        verificationCode,
        verificationCodeExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    if (!newUser)
      return NextResponse.json(
        {
          success: false,
          message:
            "Error creating user account at the moment. Please try again later.",
        },
        { status: 500 }
      );

    // Create new account
    const newAccount = await prisma.account.create({
      data: {
        userId: newUser.id,
        type: "user",
        provider: "secretShare",
        providerAccountId: `${newUser.id}-ss`,
        scope: "email, username",
      },
    });

    if (!newAccount)
      return NextResponse.json(
        {
          success: false,
          message:
            "Error creating user account at the moment. Please try again later.",
        },
        { status: 500 }
      );
    //Send verification email
    await sendVerificationEmail(
      newUser.verificationCode as string,
      newUser.email as string,
      newUser.name as string,
      newUser.verificationToken as string,
      {
        "X-Category": "Verification Email",
      }
    );
    //Hide password before sending to frontend
    logger.info(`User ${newUser.name}, ${newUser.email} account created`);

    return NextResponse.json(
      {
        success: true,
        // user: { ...newUser._doc, password: undefined },
        message: "Signup successful",
      },
      { status: 201 }
    );
  } catch (error) {
    devLog(error);
    logger.error(`Error creating user ${name}, ${email} account`);

    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred on our side signing you up. Please try again later.",
      },
      { status: 500 }
    );
  }
}
