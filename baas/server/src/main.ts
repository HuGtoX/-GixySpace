// baas/fastify-learning/src/04-log/main.ts
import isDocker from 'is-docker';
import config from '../config.js';
import buildServer from './server.js';

const server = buildServer(config);

const start = async function () {
  try {
    await server.listen({
      port: 3000,
      host: isDocker() === true ? '0.0.0.0' : '127.0.0.1',
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
