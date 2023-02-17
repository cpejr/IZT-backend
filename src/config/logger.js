import pino from 'pino';
import isDevEnvironment from '../utils/isDevEnvironment.js';

function getLogger() {
  if (isDevEnvironment)
    return pino({
      base: { pid: false },
      timestamp: () => `,"time":"${new Date().toISOString()}"`,
      transport: { target: 'pino-pretty' },
    });

  return console;
}

const logger = getLogger();
export default logger;
