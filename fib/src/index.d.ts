declare namespace Express {
    interface Request {
        user: any;
        invalidatedRefreshToken?: string;
        newToken?: string;
        newRefreshToken?: string;
    }
}
