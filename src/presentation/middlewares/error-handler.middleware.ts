import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain";

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    console.error("[Global error handler]");

    if (err instanceof CustomError) {
        console.log("This is a custom error", err.message)
        res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
        return
    }

    res.status(500).json({
        status: "error",
        message: "Internal server error"
    })

}