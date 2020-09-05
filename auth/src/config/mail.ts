import 'reflect-metadata';
import { keys } from './keys';
import { createTransport } from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

const transport = createTransport(
  sgTransport({
    auth: {
      api_key: keys.SG_API_KEY,
    },
  })
);

export const mailConfigs = {
  transport,
};
