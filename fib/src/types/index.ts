import { Router } from 'express';

export type Middleware = (router: Router) => void;
