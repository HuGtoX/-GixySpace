import { fastify } from 'fastify';
import type { Config } from './config.js';

declare module 'fastify' {
	interface FastifyInstance {
		configuration: { db: string; port: number };
	}
}
async function buildServer(
	config: Config
): Promise<ReturnType<typeof fastify>> {
	const pino = config.PRETTY_PRINT
		? {
				transport: {
					target: 'pino-pretty',
					options: {
						translateTime: 'HH:MM:ss Z',
						ignore: 'pid,hostname'
					}
				}
			}
		: {};
	const opts = {
		...config,
		logger: {
			level: config.LOG_LEVEL,
			...pino
		}
	};
	const app = fastify(opts);
	app.register(import('./plugins/my-authenticate.js'), {
		JWT_SECRET: opts.JWT_SECRET
	});

	await app.register(import('./plugins/plugin1'));
	app.register(import('./routes/users.js'));
	app.register(import('./routes/login.js'));

	app.get('/', (_req, res) => {
		res.send({});
	});
	return app;
}

export default buildServer;
