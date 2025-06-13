import * as router from './src/router.ts';
import { printError } from './src/utils.ts';
import cfg from './cfg.json' with { type: 'json' };

async function checkAccess() {
	const result = await Deno.permissions.query({
		name: 'net',
		host: `localhost:${cfg.serverPort}`
	});
	if (
		(await Deno.permissions.query({ name: 'read', path: './public' })).state !==
		'granted'
	) {
		printError('对 ./public 没有读权限');
		Deno.exit(1);
	}
	if (
		(await Deno.permissions.query({ name: 'read', path: './shared' })).state !==
		'granted'
	) {
		printError('对 ./shared 没有读权限');
		Deno.exit(1);
	}
	if (result.state !== 'granted') {
		printError(`对 localhost:${cfg.serverPort} 的网络访问权限未授权`);
		Deno.exit(1);
	}
}

await checkAccess();
router.start();
