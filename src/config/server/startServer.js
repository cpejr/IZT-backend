import '../../errors/unhandledErrors.js'; // To handle unhandled rejections and uncaught exceptions
import mongoConfig from '../mongo.js';
import s3rverConfig from '../S3/s3rver.js';
import expressConfig from '../express.js';
import shutdownServer from './shutdownServer.js';
import isDevEnvironment from '../../utils/isDevEnvironment.js';
import logger from '../logger.js';
import { EXIT_STATUS } from '../../utils/constants.js';

export default async function startServer() {
  try {
    let s3rverConnection;
    if (isDevEnvironment) {
      s3rverConnection = await s3rverConfig();
    }

    const databaseConnection = await mongoConfig();
    const serverConnection = await expressConfig();

    shutdownServer({ serverConnection, databaseConnection, s3rverConnection });
  } catch (err) {
    logger.error(err, 'App exited with failure');
    process.exit(EXIT_STATUS.FAILURE);
  }
}
