import nodemailer from 'nodemailer';
import logger from './logger.js';
import { InternalServerError } from '../errors/baseErrors.js';

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
      throw new InternalServerError(
        `Nodemailer error in sending email: ${error.message}`
      );
    }
  }
}
