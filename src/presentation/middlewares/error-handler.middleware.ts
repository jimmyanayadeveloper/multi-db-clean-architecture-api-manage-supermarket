import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain";

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    console.error("[Global error handler]", err);

    if (err instanceof CustomError) {
        console.log("es un custom error")
        res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    res.status(500).json({
        status: "error",
        message: "Internal server error"
    })

}