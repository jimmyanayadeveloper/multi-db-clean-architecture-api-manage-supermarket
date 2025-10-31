import express, { Router } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error-handler.middleware';
import { requestId, requestLogger } from './middlewares/request-logger.middleware';

interface Options {
    port: number;
    routes: Router
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {

        //* Middlewares
        this.app.use(cors({
            origin: 'http://localhost:4200', // por ejemplo, para Angular en desarrollo
            methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
            credentials: true
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));


        // 🔗 Correlación + logging de entrada/salida
        this.app.use(requestId);
        this.app.use(requestLogger);

        //* Routes
        this.app.use(this.routes);

        //*Middleware to manage global errors
        this.app.use(errorHandler);


        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })

    }

}