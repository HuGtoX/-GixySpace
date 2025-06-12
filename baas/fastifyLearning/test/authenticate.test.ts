// src/10-pluggable-jwt/test/authenticate.test.ts
import { describe, expect, it, vi } from 'vitest';
import { fastify } from 'fastify';
import errors from 'http-errors';

async function buildServer(opts: { JWT_SECRET: string }) {
  return fastify().register(import('../plugins/my-authenticate.js'), opts);
}
describe('认证', () => {
  it('失败:认证失败', async () => {
    const server = await buildServer({
      JWT_SECRET: 'supersecret',
    });

    const error = new errors.Unauthorized();
    const jwtVerify = vi.fn(() => 'returns');
    const send = vi.fn(() => 'returns');
    const req: any = {
      jwtVerify: jwtVerify.mockRejectedValue(error),
    };
    const reply: any = { send };

    // @ts-expect-error await for fastify build
    await server.authenticate(req, reply);

    expect((send.mock.lastCall as any[])[0]).toEqual(error);
  });

  it('成功:认证成功', async () => {
    const server = await buildServer({
      JWT_SECRET: 'supersecret',
    });

    const jwtVerify = vi.fn();
    const send = vi.fn();
    const req: any = {
      jwtVerify: jwtVerify.mockReturnValue(''),
    };
    const reply: any = { send };

    // @ts-expect-error await for fastify build
    await server.authenticate(req, reply);

    expect(send).toHaveBeenCalledTimes(0);
  });
});
