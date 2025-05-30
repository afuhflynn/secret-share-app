import path from "node:path";
import fs from "node:fs";
import {
  accountLogoutEmailTemplate,
  accountNotificationTemplate,
  passwordResetEmailTemplate,
  verificationEmailTemplate,
  welcomeEmailTemplate,
  accountDeleteEmailTemplate,
  adminNotificationTemplateForAccountDelete,
} from "@/emails-templates-setup/email-templates";
import { sendEmails } from "@/config/email.sender.setup";
import { logger } from "@/utils/logger";
import { devLog } from "../devLog";

// 🔑 Build an absolute path from project root—no __dirname hacks.
const logoPath = path.join(process.cwd(), "public", "logo.ico");

// 🛡️ Optional: pre-flight check to catch missing files instantly
try {
  fs.accessSync(logoPath, fs.constants.R_OK);
} catch {
  console.error("🚨 Logo not found at:", logoPath);
}

const attachments = [
  {
    filename: "logo.ico",            // exact filename your repo uses
    path: logoPath,                  // absolute path
    cid: "inline-logo-unique-cid",   // unique content-id
  },
];

const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL!;

// ——————————————
// Email-sending functions
// ——————————————
const sendVerificationEmail = async (
  code: string,
  email: string,
  username: string,
  token: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = verificationEmailTemplate
      .replace("[user_name]", username)
      .replace("[verification_code]", code)
      .replace("[verification_link]", `${clientUrl}/auth/verify-email/${token}`)
      .replace("[unsubscribe_link]", `${clientUrl}/mail/unsubscribe`);
    await sendEmails(
      email,
      "Verification Email",
      newEmail,
      headers,
      attachments
    );
  } catch (error: any | { message: string }) {
    logger.error(`Error sending verification email: ${error.message}`);
  }
};

const sendNotificationEmail = async (
  activity: string,
  email: string,
  username: string,
  time: string,
  author: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    devLog(time);
    const newEmail: string = accountNotificationTemplate
      .replace("[user_name]", username)
      .replace("[account_security_link]", `${clientUrl}/dashboard/settings`)
      .replace(`"[account_security_link]"`, `${clientUrl}/dashboard/settings`)
      .replace("[activity_description]", activity)
      .replace(
        "[activity_time]",
        `${new Date(Date.now()).toDateString()}-${new Date(
          Date.now()
        ).toLocaleTimeString()}`
      )
      .replace("[activity_author]", author)
      .replace("[unsubscribe_link]", `http://localhost:3000/mail/unsubscribe`);
    await sendEmails(
      email,
      "Notification Email",
      newEmail,
      headers,
      attachments
    );
  } catch (error: any | { message: string }) {
    logger.error(`Error sending notification email: ${error.message}`);
  }
};
const sendWelcomeEmail = async (
  email: string,
  username: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = welcomeEmailTemplate
      .replace("[user_name]", username)
      .replace("[homepage_link]", `${clientUrl}`)
      .replace("[learn_link]", `${clientUrl}/how-it-works`)
      .replace("[unsubscribe_link]", `${clientUrl}/mail/unsubscribe`);
    //Send email content
    await sendEmails(email, "Welcome Email", newEmail, headers, attachments);
  } catch (error: any | { message: string }) {
    logger.error(`Error sending welcome email: ${error.message}`);
  }
};
const sendLogoutEmail = async (
  email: string,
  username: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = accountLogoutEmailTemplate
      .replace("[user_name]", username)
      .replace("[account_security_link]", `${clientUrl}/dashboard/settings`)
      .replace(`"[account_security_link]"`, `${clientUrl}/dashboard/settings`)
      .replace("[unsubscribe_link]", `${clientUrl}/mail/unsubscribe`);
    //Send email content
    await sendEmails(email, "Logout Email", newEmail, headers, attachments);
  } catch (error: any | { message: string }) {
    logger.error(`Error sending account logout email: ${error.message}`);
  }
};
const sendPasswordResetEmail = async (
  email: string,
  username: string,
  resetUrl: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = passwordResetEmailTemplate
      .replace("[user_name]", username)
      .replace("[reset_link]", resetUrl)
      .replace(`"[reset_link]"`, resetUrl)
      .replace("[unsubscribe_link]", `${clientUrl}/mail/unsubscribe`);
    //Send email content
    await sendEmails(
      email,
      "Password Reset Email",
      newEmail,
      headers,
      attachments
    );
  } catch (error: any | { message: string }) {
    logger.error(`Error sending password reset email: ${error.message}`);
  }
};
const sendAccountDeleteEmail = async (
  email: string,
  username: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = accountDeleteEmailTemplate
      .replace("[user_name]", username)
      .replace("[unsubscribe_link]", `${clientUrl}/mail/unsubscribe`);
    //Send email content
    await sendEmails(
      email,
      "Account Delete Email",
      newEmail,
      headers,
      attachments
    );
  } catch (error: any | { message: string }) {
    logger.error(`Error sending account delete email: ${error.message}`);
  }
};
const sendAccountDeleteAdminNotificationEmail = async (
  email: string,
  username: string,
  accountDeleteReason: string,
  time: string,
  headers: {
    "X-Category": string;
  }
) => {
  try {
    const newEmail: string = adminNotificationTemplateForAccountDelete
      .replace("[user_name]", "Tembeng Flynn")
      .replace("[user_info]", `${username}, ${email}`)
      .replace("[account_delete_reason]", accountDeleteReason)
      .replace("[activity_time]", time)
      .replace("[unsubscribe_link]", `${clientUrl}/mail/unsubscribe`);

    // Read admin email from env file
    const adminEmail = process.env.NODEMAILER_ADMIN_EMAIL!;
    //Send email content
    await sendEmails(
      adminEmail,
      "Account Delete Email",
      newEmail,
      headers,
      attachments
    );
  } catch (error: any | { message: string }) {
    logger.error(
      `Error sending user account delete notification to admin email: ${error.message}`
    );
  }
};

export {
  sendVerificationEmail,
  sendNotificationEmail,
  sendWelcomeEmail,
  sendLogoutEmail,
  sendPasswordResetEmail,
  sendAccountDeleteEmail,
  sendAccountDeleteAdminNotificationEmail,
};
