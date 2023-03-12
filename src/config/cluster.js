import os from 'os';
import cluster from 'cluster';
import logger from './logger.js';
import startServer from './server/startServer.js';
import isDevEnvironment from '../utils/isDevEnvironment.js';

const runPrimaryProcess = () => {
  const processesCount = os.cpus().length;

  for (let index = 0; index < processesCount; index += 1) cluster.fork();

  cluster.on('exit', (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      logger.error(`Worker ${worker.process.pid} exit`);
      cluster.fork();
    }
  });
};

export default function startClusterServerInProd() {
  if (isDevEnvironment) return startServer();

  return cluster.isPrimary ? runPrimaryProcess() : startServer();
}
