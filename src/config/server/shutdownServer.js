import logger from '../logger.js';
import { EXIT_STATUS } from '../../utils/constants.js';

export default function shutdownServer({
  serverConnection,
  databaseConnection,
}) {
  const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  exitSignals.forEach((signal) => {
    process.on(signal, () => {
      serverConnection.close(() => {
        databaseConnection.connection.close(false, () => {
          logger.info(`App exited with success`);
          process.exit(EXIT_STATUS.SUCCESS);
        });
      });
    });
  });
}
