import './loadDotEnv.js';
import nodemailer from 'nodemailer';
import logger from './logger.js';

const transporterConfig = {
  development: {
    host: 'localhost',
    port: 1025,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  },
  production: {
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    secure: false,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
};

const transporter = nodemailer.createTransport(
  transporterConfig[process.env.NODE_ENV]
);
export default class Email {
  static async sendEmail(request) {
    const config = {
      from: `${process.env.EMAIL_FROM}`,
      ...request,
    };
    try {
      await transporter.sendMail(config);
      logger.info(`Email sended from ${config.from} to ${config.to}`);
    } catch (error) {
      logger.error(
        error,
        `Nodemailer error in sending email with config: ${config}`
      );
    }
  }
}

async function main() {
  const mailOptions = {
    to: 'joaopiraja@cpejr.com.br',
    subject: 'Test email for the tutorial',
    text: 'Here is the text of the test email',
    html: '<h1>HTML</h1><p>Here is the text in a paragraph for the test email</p>',
  };
  return Email.sendEmail(mailOptions);
}

main();
