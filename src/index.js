/* eslint-disable import/first */
import 'dotenv/config';
import logger from './config/logger.js';
import mongoConfig from './config/mongo.js';

process.on('uncaughtException', (err) => {
  logger.error(err, 'Uncaught exception');
  process.exit(1);
});

import app from './app.js';

process.on('unhandledRejection', (err) => {
  logger.error(err, 'Unhandled rejection');
  process.exit(1);
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, async () => {
  try {
    await mongoConfig();
    logger.info(`✅ Server started at port ${PORT}`);
  } catch (err) {
    logger.error(err, err.message);
    process.exit(1);
  }
});
