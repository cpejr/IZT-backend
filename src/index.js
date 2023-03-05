import './errors/unhandledErrors.js';
import logger from './config/logger.js';
import mongoConfig from './config/mongo.js';
import s3rverConfig from './config/S3/s3rver.js';
import maildevConfig from './config/mail/mailDev.js';
import isDevEnvironment from './utils/isDevEnvironment.js';
import app from './app.js';

const PORT = process.env.PORT || 3333;
app.listen(PORT, async () => {
  try {
    if (isDevEnvironment) {
      await s3rverConfig();
      await maildevConfig();
    }
    await mongoConfig();
    logger.info(
      `✅ Server started at port ${PORT} and with a process pid ${process.pid}`
    );
  } catch (err) {
    logger.error(err, err.message);
    process.exit(1);
  }
});
