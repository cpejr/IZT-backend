import 'dotenv/config';
import logger from './config/logger.js';
import mongoConfig from './config/mongo.js';
import app from './app.js';

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
