// baas/fastify-learning/src/11-integration/test/unit/user.test.ts
import { describe, expect, it, vi } from 'vitest';
import { fastify } from 'fastify';
import errors from 'http-errors';
const signMock = vi.fn();
function buildServer() {
  return fastify()
    .decorate('authenticate', signMock)
    .register(import('../../src/routes/user/index.js'));
}
describe('GET /user', () => {
  it('失败 401:认证失败', async () => {
    const server = buildServer();
    const error = new errors.Unauthorized();
    signMock.mockRejectedValue(error);
    const res = await server.inject('/user');
    expect(res.statusCode).toEqual(401);
  });

  it('成功 200:返回请求的用户', async () => {
    const server = buildServer();

    signMock.mockImplementationOnce(async (request: any) => {
      request.user = { username: '紫霞' };
    });
    const res = await server.inject('/user');
    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual({ username: '紫霞' });
  });
});
