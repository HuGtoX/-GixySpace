// src/10-pluggable-jwt/test/startup.test.ts
import { describe, expect, it } from 'vitest';
import buildServer from '../server.js';
import config from '../config.js';

describe('启动', () => {
	it('成功注册 jwt 插件', async () => {
		const server = await buildServer(config);
		await server.ready();
		expect(server.jwt).toBeDefined();
	});
});
