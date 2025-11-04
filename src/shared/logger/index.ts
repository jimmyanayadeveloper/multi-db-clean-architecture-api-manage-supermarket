import winston from "winston";

const isProd = process.env.NODE_ENV === "production";

const devFormat = winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
    return `[${timestamp}] [${level}] ${message} ${metaStr}`;
});

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        isProd
            ? winston.format.json()
            : winston.format.combine(winston.format.colorize(), devFormat)
    ),
    transports: [new winston.transports.Console()]
});

export function getRequestLogger(requestId?: string) {
    return logger.child({ requestId });
}