// lib/logger.ts
import fs from "fs";
import path from "path";
import { createLogger, format, transports, Logger } from "winston";

const { combine, timestamp, printf } = format;

// Ensure the logs directory exists
const logDir = path.resolve(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define our custom log format
const logFormat = printf(({ level, message, timestamp: ts }) =>
  `[${ts}] [${level.toUpperCase()}] ${message}`
);

// Only write to files in development (avoid disk writes in prod Lambdas)
const isDev = process.env.NODE_ENV !== "production";

// Create and export the Winston logger
const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    ...(isDev
      ? [
          new transports.File({
            filename: path.join(logDir, "error.log"),
            level: "error",
          }),
          new transports.File({
            filename: path.join(logDir, "combined.log"),
          }),
        ]
      : []),
    new transports.Console(),
  ],
});

export default logger;
