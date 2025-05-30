/**
* Logs to console and into the logger file only in development
*/

const isDev = process.env.NODE_ENV !== "production";

const fileTransport = new transports.File({
  filename: path.join(logDir, "logger.log"),
  level: "info",
});

export const logger = createLogger({
  format: combine(timestamp(), logFormat),
  transports: [
    ...(isDev ? [fileTransport] : []),
    new transports.Console(),
  ],
});
