
export class CustomError extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly message: string
    ) {
        super(message);
    }
    /* -400 Bad Request- */
    static badRequest(message: string) {
        return new CustomError(400, message)
    }
    /* -401 Unauthorized-  */
    static unauthorized(message: string) {
        return new CustomError(401, message)
    }
    /* -403 Forbidden- */
    static forbidden(message: string) {
        return new CustomError(403, message);
    }
    /* -404 Not found-  */
    static notFound(message: string) {
        return new CustomError(404, message);
    }
    /* -405 MethodNotAllowed- */
    static methodNotAllowed(message: string) {
        return new CustomError(405, message);
    }

    /* -409 Conflic- */
    static conflict(message: string) {
        return new CustomError(409, message);
    }

    /* -422 Unprocessable entity- */
    static unprocessableEntity(message: string) {
        return new CustomError(422, message);
    }

    /* -429 Too Many Requests */
    static tooManyRequests(message: string = 'Too many request') {
        return new CustomError(429, message);
    }

    /* -500 Internal server error */
    static internalServer(message: string = 'Internal Server Error') {
        return new CustomError(500, message)
    }

    /* -501 Not implemented- */
    static notImplemented(message: string = 'Not implemented') {
        return new CustomError(501, message);
    }

    /* -503 Service Unavailable */
    static serviceUnavailable(message: string = 'Service Unavailable') {
        return new CustomError(503, message);
    }
}