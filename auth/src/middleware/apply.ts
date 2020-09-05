import { Router, ErrorRequestHandler, Application } from 'express';

import { Middleware } from '../etc';

export const applyMiddlewares = (middlewares: Middleware[], router: Router) => {
    for (const middleware of middlewares) {
        middleware(router);
    }
};

export const applyErrorHandlers = (
    errorHandlers: ErrorRequestHandler[],
    app: Application
) => {
    for (const errorHandler of errorHandlers) {
        app.use(errorHandler);
    }
};
