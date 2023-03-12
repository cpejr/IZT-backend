import logger from '../config/logger.js';
import { EXIT_STATUS } from '../utils/constants.js';

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error(
      `App exiting due to an unhandled promise ${JSON.stringify(
        promise
      )} and reason: ${reason}`
    );
    throw reason;
  })
  .on('uncaughtException', (error) => {
    logger.error(error, 'App exiting due to an uncaught exception');
    process.exit(EXIT_STATUS.FAILURE);
  });
