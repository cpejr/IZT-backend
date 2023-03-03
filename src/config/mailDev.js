import MailDev from 'maildev';
import logger from './logger.js';
import { InternalServerError } from '../errors/BaseErrors.js';

export const mailDevUrl = 'http://localhost:1080';
export default function maildevConfig() {
  return new Promise((resolve, reject) => {
    const maildev = new MailDev({
      basePathname: '/maildev',
      silent: true,
    });

    maildev.listen((error) => {
      if (error) {
        const err = new InternalServerError(
          `❌ Failed to connect to maildev. Error: ${error}.`
        );
        reject(err);
      } else {
        logger.info(
          `✅ Established connection with maildev in ${mailDevUrl}/maildev`
        );
        resolve();
      }
    });
  });
}
