import pino from 'pino';

const logger = pino({
  base: { pid: false },
  level: process.env.PINO_LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
    },
  },
});

export default logger;
