import pino from 'pino';
import isDevEnvironment from '../utils/isDevEnvironment.js';

function getLogger() {
  if (isDevEnvironment)
    return pino({
      base: { pid: false },
      level: process.env.PINO_LOG_LEVEL || 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
        },
      },
    });

  return console;
}

const logger = getLogger();
export default logger;
