import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/utils/logger";
import { devLog } from "@/utils/devLog";
import { emailTransporter } from "@/config/nodemailer.config";

/**
 * @description A function that handles messages from users sent to admins
 * @param req
 * @returns
 */

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();
  try {
    //Ensure all fields are filled
    if (!email || !name || !subject || !message)
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );

    //Send contact email
    await emailTransporter.sendMail({
      from: email,
      to: process.env.NODEMAILER_ADMIN_EMAIL!,
      subject,
      text: message,
      headers: {
        "X-Category": "Contact email from users at SecretShare",
      },
    });
    //Hide password before sending to frontend
    logger.error(
      `Email sent successfully! from ${email} to ${process.env.NODEMAILER_ADMIN_EMAIL}`
    );

    return NextResponse.json(
      {
        success: true,
        message: "We've received your message and will get back to you soon.",
      },
      { status: 201 }
    );
  } catch (error) {
    devLog(error);
    logger.error(
      `Error sending email from ${email} - to ${process.env.NODEMAILER_ADMIN_EMAIL}}`
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again.",
      },
      { status: 500 }
    );
  }
}
