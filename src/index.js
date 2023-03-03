/* eslint-disable import/first */
import './config/loadDotEnv.js';
import logger from './config/logger.js';
import mongoConfig from './config/mongo.js';
import s3rverConfig from './config/s3rver.js';
import isDevEnvironment from './utils/isDevEnvironment.js';

process.on('uncaughtException', (err) => {
  logger.error(err, 'Uncaught exception');
  process.exit(1);
});

import app from './app.js';
import maildevConfig from './config/mailDev.js';

process.on('unhandledRejection', (err) => {
  logger.error(err, 'Unhandled rejection');
  process.exit(1);
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, async () => {
  try {
    if (isDevEnvironment) {
      await s3rverConfig();
      await maildevConfig();
    }
    await mongoConfig();
    logger.info(`✅ Server started at port ${PORT}`);
  } catch (err) {
    logger.error(err, err.message);
    process.exit(1);
  }
});
