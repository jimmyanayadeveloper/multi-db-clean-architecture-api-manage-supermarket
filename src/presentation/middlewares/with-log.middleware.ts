// src/presentation/middlewares/with-log.middleware.ts
import { Request, Response, NextFunction, RequestHandler } from "express";

const SENSITIVE_FIELDS = new Set([
    "password", "pwd", "pass", "token", "accessToken", "refreshToken",
    "secret", "authorization", "auth", "creditCard", "cvv", "ssn"
]);

function redactDeep<T>(value: T): T {
    if (value === null || value === undefined) return value as T;
    if (Array.isArray(value)) return value.map(redactDeep) as any;
    if (typeof value === "object") {
        const out: any = {};
        for (const [k, v] of Object.entries(value)) {
            out[k] = SENSITIVE_FIELDS.has(k) ? "***REDACTED***" : redactDeep(v as any);
        }
        return out;
    }
    return value;
}

function safeJson(obj: any): string {
    try { return JSON.stringify(obj); } catch { return "[unserializable]"; }
}

/**
 * Envuelve controladores async para LOG (Express 5 ya propaga errores).
 * - Etiqueta de handler
 * - Timing por handler
 * - Captura opcional de payload de respuesta (redactado)
 */
export const withLog = (
    label: string,
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
    options?: { captureResponse?: boolean }
): RequestHandler => {
    return async (req, res, next) => {
        const start = process.hrtime.bigint();
        const id = req.requestId;
        const routeInfo = `${req.method} ${req.originalUrl}`;

        let originalJson = res.json.bind(res);
        let originalSend = res.send.bind(res);
        let capturedBody: any = undefined;

        if (options?.captureResponse) {
            res.json = ((body: any) => {
                capturedBody = body;
                return originalJson(body);
            }) as any;

            res.send = ((body: any) => {
                capturedBody = body;
                return originalSend(body);
            }) as any;
        }

        try {
            await fn(req, res, next);
            const durMs = Number(process.hrtime.bigint() - start) / 1_000_000;

            if (options?.captureResponse) {
                console.log(
                    `[OK] ${id} :: ${routeInfo} :: ${label} :: ${res.statusCode} :: ${durMs.toFixed(1)}ms :: resp=${safeJson(redactDeep(capturedBody))}`
                );
            } else {
                console.log(
                    `[OK] ${id} :: ${routeInfo} :: ${label} :: ${res.statusCode} :: ${durMs.toFixed(1)}ms`
                );
            }
        } catch (err: any) {
            const durMs = Number(process.hrtime.bigint() - start) / 1_000_000;
            console.error(
                `[ERR] ${id} :: ${routeInfo} :: ${label} :: ${res.statusCode} :: ${durMs.toFixed(1)}ms`
            );
            console.error(`→ Message: ${err?.message}`);
            console.error(`→ Stack: ${err?.stack?.split("\n")[1]?.trim()}`);
            next(err); // lo recoge tu errorHandler global
        }
    };
};
