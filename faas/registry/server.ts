import * as router from './src/router.ts';
import { printError } from './src/utils.ts';
import cfg from './config.json' with { type: 'json' };

async function checkAccess() {
	const result = await Deno.permissions.query({
		name: 'net',
		host: `localhost:${cfg.serverPort}`
	});

	if (result.state !== 'granted') {
		printError(`对 localhost:${cfg.serverPort} 的网络访问权限未授权`);
		Deno.exit(1);
	}
}

await checkAccess();
router.start();
