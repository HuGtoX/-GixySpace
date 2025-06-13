import { Application, Router, Context } from '../deps.ts';
import cfg from '../cfg.json' with { type: 'json' };
import * as HealthCheck from './healthcheck/mod.ts';
import * as DB from './db/mod.ts';
import * as Registry from './registry/mod.ts';

export async function start() {
	const router = new Router();
	router.get('/', (ctx) => ctx.response.redirect('./index.html'));
	router.get('/index.html', (ctx) => sendLandingPage(ctx));
	router.get('/v1/healthcheck', HealthCheck.getHandler);
	router.get('/v1/registry', Registry.getHandler);
	router.post('/v1/registry', Registry.postHandler);
	router.delete('/v1/registry', Registry.deleteHandler);
	router.get('/register@0.1.0/mod.ts', (ctx) =>
		sendPkgRegister(ctx, 'register@0.1.0/mod.ts')
	);
	router.get('/debug/db', DB.getHandler);

	const app = new Application();
	app.use(router.routes());
	app.use(router.allowedMethods());

	console.log(`注册服务器运行在http://localhost:${cfg.serverPort}`);
	await app.listen(`localhost:${cfg.serverPort}`);
}

async function sendLandingPage(ctx: Context) {
	ctx.response.body = await Deno.readFile('./public/index.html');
	ctx.response.headers.set('Content-Type', 'text/html');
}
async function sendPkgRegister(ctx: Context, pkgPath: string) {
	ctx.response.body = await Deno.readFile(`./shared/${pkgPath}`);
	ctx.response.headers.set(
		'Content-Type',
		'application/typescript; charset=utf-8'
	);
}
