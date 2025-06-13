import type { fastify } from 'fastify';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import config from '../../../config.js';
import buildServer from '../../server.js';

describe('server', () => {
	let server: ReturnType<typeof fastify>;
	beforeEach(async () => {
		server = await buildServer(config);
	});
	afterEach(async () => {
		server.close();
	});
	it('用户登陆->返回用户信息', async () => {
		const loginRes = await server.inject({
			url: '/login',
			method: 'POST',
			payload: {
				username: '紫霞',
				password: '紫霞'
			}
		});

		const { token } = await loginRes.json();

		expect(loginRes.statusCode).toEqual(200);
		expect(typeof token).toEqual('string');

		const userRes = await server.inject({
			url: '/user',
			headers: {
				authorization: `bearer ${token}`
			}
		});

		expect(userRes.statusCode).toEqual(200);
		const user = await userRes.json();
		expect(user).toEqual({ username: '紫霞' });
	});
});
