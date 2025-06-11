import { describe, expect, it } from 'vitest';
import buildServer from '../server.js';

describe('GET /users', () => {
	it('成功 200:返回用户名', async () => {
		const server = await buildServer();
		const res = await server.inject('/users');
		expect(res.statusCode).toEqual(200);
		expect(await res.json()).toEqual([
			{ username: '紫霞' },
			{ username: '至尊宝' }
		]);
	});
});
