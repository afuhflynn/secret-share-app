import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] - [${level.toUpperCase()}] - ${message}\n`;
});

export const logger = createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.File({ filename: "./logs/logger.log" }),
    new transports.Console(),
  ],
});
