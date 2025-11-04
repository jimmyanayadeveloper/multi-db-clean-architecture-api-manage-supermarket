import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain";;
import { getRequestLogger } from "../../shared/logger";

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    const requestId = req.requestId;
    const log = getRequestLogger(requestId);
    const isCustom = err instanceof CustomError;
    const statusCode = isCustom ? err.statusCode : 500;
    const message = isCustom ? err.message : "Internal server error";

    log.error(`[ERROR] ${message}`, {
        name: err.name,
        stack: err.stack,
        statusCode
    });

    res.status(statusCode).json({
        status: "error",
        message,
        requestId
    });
};