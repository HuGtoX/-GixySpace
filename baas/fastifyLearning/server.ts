import { fastify } from 'fastify';
import fs from 'fs';
import { default as jwt } from '@fastify/jwt';

declare module 'fastify' {
	interface FastifyInstance {
		configuration: { db: string; port: number };
	}
}
const logStream = fs.createWriteStream('./log/my-log.log', { flags: 'a' });

async function buildServer() {
	const app = fastify({
		logger: {
			stream: logStream,
			level: 'info',
			transport: {
				target: 'pino-pretty',
				options: {
					translateTime: 'SYS:standard',
					ignore: 'pid,hostname'
				}
			}
		}
	});

	app.decorate('configuration', {
		db: 'mysql-db',
		port: 3306
	});

	app.register(jwt, {
		secret: 'super-secret'
	});
	await app.register(import('./plugins/plugin1'));
	await app.register(import('./plugins/plugin2'));

	app.register(import('./routes/users.js'));
	app.register(import('./routes/login.js'));

	app.get('/', (_req, res) => {
		res.send({});
	});
	return app;
}

export default buildServer;
