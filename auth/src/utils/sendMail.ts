import { mailConfigs as config, keys } from '../config';
import { logger } from '../utils';

type MailType = 'confirmation' | null;

type Params = {
  email: string;
  link: string;
};

const transport = config.transport;
const siteTitle = 'My site';
const siteEmail = keys?.siteEmail ?? 'no-reply@mysite.com';

export async function sendEmail(
  type: MailType = 'confirmation',
  { email, link }: Params
) {
  return new Promise((resolve, reject) => {
    const options = {
      from: {
        name: siteTitle,
        address: siteEmail,
      },
      to: email,
      subject: 'Subject',
      text: 'Please use a HTML compatible client to view this email',
      html: 'Email',
    };

    switch (type) {
      case 'confirmation':
        options.subject = 'Confirm your Account';
        options.text = `Use the following link to confirm your email \n ${link}`;
        options.html = `
                    <html>
                        <body>
                            <h3>${siteTitle}</h3>
                            <p>Hello there, welcome to ${siteTitle}</p>
                            <p>Use the following link to confirm your email <br> <a href="${link}">here</a></p> 
                        </body>
                    </html>
                `;
        break;

      default:
        break;
    }

    transport.sendMail(options, (err) => {
      if (err) {
        logger.error(`Error sending ${type} email to ${email}: ${err}`);
        return reject(err);
      }

      logger.info(`Welcome mail was sent to ${email}`);
      resolve('Email sent');
    });
  });
}
