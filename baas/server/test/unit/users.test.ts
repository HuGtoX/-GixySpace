import { describe, expect, it } from 'vitest';
import buildServer from '../../src/server.js';
import config from '../../config.js';

describe('GET /users', () => {
  it('成功 200:返回用户名', async () => {
    const server = buildServer(config);
    const res = await server.inject('/users');
    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual([{ username: '紫霞' }, { username: '至尊宝' }]);
  });
});
