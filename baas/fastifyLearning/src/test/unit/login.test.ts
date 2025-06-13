// baas/fastify-learning/src/08-jwt/test/login.test.ts
import { describe, expect, it, vi } from 'vitest';
import { fastify } from 'fastify';
const signMock = vi.fn(() => 'returns');

function buildServer() {
	return (
		fastify()
			// @ts-ignore
			.decorate('jwt', { sign: signMock })
			.register(import('../../routes/login.js'))
	);
}

describe('POST /login', () => {
	it('失败 400:没有输入账号和密码', async () => {
		const server = buildServer();
		const res = await server.inject({
			url: '/login',
			method: 'POST'
		});
		expect(res.statusCode).toEqual(400);
	});

	it('失败 400:没有输入密码', async () => {
		const server = buildServer();
		const res = await server.inject({
			url: '/login',
			method: 'POST',
			payload: {
				username: '紫霞'
			}
		});
		expect(res.statusCode).toEqual(400);
	});
	it('失败 401:密码错误', async () => {
		const fastify = buildServer();
		const res = await fastify.inject({
			url: '/login',
			method: 'POST',
			payload: {
				username: '紫霞',
				password: 'wrong password'
			}
		});
		expect(res.statusCode).toEqual(401);
	});
	it('成功 200:获得一个 token', async () => {
		const fastify = buildServer();
		signMock.mockReturnValueOnce('jwt token');
		const res = await fastify.inject({
			url: '/login',
			method: 'POST',
			payload: {
				username: '紫霞',
				password: '紫霞'
			}
		});
		expect(res.statusCode).toEqual(200);
		expect((await res.json()).token).toEqual('jwt token');
	});
});
