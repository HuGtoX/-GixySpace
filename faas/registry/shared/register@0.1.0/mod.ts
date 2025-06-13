// shared/register@0.1.0/mod.ts
import { Status } from 'https://deno.land/std@0.182.0/http/mod.ts';

export async function register(
	path: string[],
	filePath: string
): Promise<number> {
	const res = await fetch('http://localhost:8080/v1/registry', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			path,
			filePath
		})
	});
	if (res.status !== Status.OK) {
		throw new Error('注册失败');
	}
	const { port } = await res.json();
	return port;
}
