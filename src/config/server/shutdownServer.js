import logger from '../logger.js';
import { EXIT_STATUS } from '../../utils/constants.js';

export default function shutdownServer({
  serverConnection,
  databaseConnection,
  s3rverConnection,
}) {
  const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  exitSignals.forEach((signal) => {
    process.on(signal, () => {
      serverConnection.close(async () => {
        try {
          await databaseConnection.connection.close(false);
          await s3rverConnection?.close();
          logger.info(`App exited with success`);
          process.exit(EXIT_STATUS.SUCCESS);
        } catch (error) {
          logger.error(error, 'App exited with failure');
          process.exit(EXIT_STATUS.FAILURE);
        }
      });
    });
  });
}
