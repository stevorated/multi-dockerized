declare namespace Express {
  interface Request {
    user: any;
    invalidatedRefreshToken?: string;
    newToken?: string;
    newRefreshToken?: string;
  }
}
// declare module 'lodash';
declare module 'nodemailer-sendgrid-transport';
