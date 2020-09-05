import parser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { Router } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const handleCors = (router: Router) => {
    router.use(cors({ credentials: true, origin: true }));
};

const handleParsing = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
};

const handleCompression = (router: Router) => {
    router.use(compression());
};

const handleHelmet = (router: Router) => {
    router.use(helmet());
};

const handleCookieParser = (router: Router) => {
    router.use(cookieParser());
};

const handleLogs = (router: Router) => {
    router.use(morgan('combined'));
};

export const middlewares = [
    handleCors,
    handleCookieParser,
    handleParsing,
    handleCompression,
    handleHelmet,
    handleLogs,
];
