// src/presentation/middlewares/request-logger.middleware.ts
import { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";
import { getRequestLogger } from "../../shared/logger";

// Extend request interface to add two optional properties 
declare global {
    namespace Express {
        interface Request {
            requestId?: string;
            userId?: string;
        }
    }
}

// List sensitive fields  no logger
const SENSITIVE_FIELDS = new Set([
    "password", "pwd", "pass", "token", "accessToken", "refreshToken",
    "secret", "authorization", "auth", "creditCard", "cvv", "ssn"
]);


function redactDeep<T>(value: T): T {
    if (value === null || value === undefined) return value;

    if (Array.isArray(value)) {
        return value.map(redactDeep) as any;
    }

    if (typeof value === "object") {
        const out: any = {};
        for (const [k, v] of Object.entries(value)) {
            if (SENSITIVE_FIELDS.has(k)) {
                out[k] = "***REDACTED***";
            } else {
                out[k] = redactDeep(v as any);
            }
        }
        return out;
    }
    return value;
}

// Serialization safe
function safeJson(obj: any): string {
    try {
        return JSON.stringify(obj);
    } catch {
        // fallback minimal
        return "[unserializable]";
    }
}

// Add a requestID each request
export function requestId(req: Request, _res: Response, next: NextFunction) {
    req.requestId = req.requestId || randomUUID();
    next();
}

// Logger por request: inicio/fin, tiempos y contexto
export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime.bigint();
    const id = req.requestId ?? randomUUID();
    const log = getRequestLogger(id);
    const routeInfo = `${req.method} ${req.originalUrl}`;

    // Logs de entrada (con redacción)
    const inParams = redactDeep(req.params);
    const inQuery = redactDeep(req.query);
    const inBody = redactDeep(req.body);

    log.info(`[REQ] ${routeInfo}`, {
        params: safeJson(inParams),
        query: safeJson(inQuery),
        body: safeJson(inBody)
    })

    // Hook ending response
    res.on("finish", () => {
        const durMs = Number(process.hrtime.bigint() - start) / 1_000_000;
        log.info(`[RES] ${routeInfo}`, { statusCode: res.statusCode, durationMs: durMs.toFixed(2) });
    });

    next();
}
