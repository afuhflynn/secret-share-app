import {
  NODEMAILER_EMAIL_SENDER,
  NODEMAILER_GMAIL_PASS_KEY,
  NODEMAILER_MAIL_SERVICE_PROVIDER,
} from "@/utils/Load_Envs";
import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
  service: NODEMAILER_MAIL_SERVICE_PROVIDER, // Or any other email service provider
  auth: {
    user: NODEMAILER_EMAIL_SENDER,
    pass: NODEMAILER_GMAIL_PASS_KEY,
  },
});
