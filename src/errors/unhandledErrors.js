import logger from '../config/logger.js';

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error(
      `App exiting due to an unhandled promsie ${promise} and reason: ${reason}`
    );
    throw reason;
  })
  .on('uncaughtException', (error) => {
    logger.error(error, `App exiting due to an uncaught exception: ${error}`);
    process.exit(1);
  });
