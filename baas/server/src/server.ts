// baas/fastify-learning/src/09-env/server.ts
import { fastify } from 'fastify';
import cors from '@fastify/cors';
import type { Config } from '../config.js';

function buildServer(config: Config): ReturnType<typeof fastify> {
  const pino = config.PRETTY_PRINT
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
      }
    : {};
  const opts = {
    ...config,
    logger: {
      level: config.LOG_LEVEL,
      ...pino,
    },
  };
  const server = fastify(opts);

  // 注册插件
  server.register(import('./plugins/my-authenticate.js'), {
    JWT_SECRET: opts.JWT_SECRET,
  });

  server.register(cors, {
    origin: '*',
  });

  // 注册 controller 的路由
  server.register(import('./routes/users.js'));
  server.register(import('./routes/login.js'));
  server.register(import('./routes/user/index.js'));
  server.register(import('./routes/user/verification-code/index.js'), {
    prefix: '/v1',
  });
  server.register(import('./routes/user/index.js'), {
    prefix: '/v1',
  });
  server.register(import('./routes/login.js'), {
    prefix: '/v1',
  });
  server.register(import('./routes/activity/publish/index.js'), {
    prefix: '/v1',
  });
  server.register(import('./routes/activity/online/index.js'), {
    prefix: '/v1',
  });

  server.register(import('./routes/activity/done/index.js'), {
    prefix: '/v1',
  });
  server.register(import('./routes/activity/cancel/index.js'), {
    prefix: '/v1',
  });
  server.register(import('./routes/activity/join/index.js'), {
    prefix: '/v1',
  });
  server.register(import('./routes/activities/index.js'), {
    prefix: '/v1',
  });

  server.get('/health', async () => {
    return 'OK';
  });

  // 完成注册后，可以使用 server.log 访问日志对象
  server.log.info('Fastify 完成启动！');

  return server;
}

export default buildServer;
