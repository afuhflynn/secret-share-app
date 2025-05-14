import { logger } from "@/utils/logger";
import { emailTransporter } from "./nodemailer.config";
import { Attachment } from "nodemailer/lib/mailer/index";
import {
  NODEMAILER_EMAIL_SENDER,
  NODEMAILER_EMAIL_SERVER_USER,
} from "@/utils/Load_Envs";

const from = `${NODEMAILER_EMAIL_SERVER_USER} at SecretShare ${NODEMAILER_EMAIL_SENDER}`;

export const sendEmails = async (
  to: string,
  subject: string,
  htmlContent: string,
  headers: {
    "X-Category": string;
  },
  attachments?: Attachment[]
): Promise<void> => {
  try {
    await emailTransporter.sendMail({
      from: from,
      to,
      subject,
      html: htmlContent,
      attachments: attachments,
      headers: headers,
    });
    logger.error(`Email sent successfully! to ${to}`);
  } catch (error: any | { message: string }) {
    logger.error(`Error sending email: ${error.message} - to ${to}`);
  }
};
