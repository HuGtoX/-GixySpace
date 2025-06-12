import { type FastifyPluginAsync, type FastifyReply, type FastifyRequest } from 'fastify';
// eslint-disable-next-line import/no-named-default
import { default as fp } from 'fastify-plugin';
// eslint-disable-next-line import/no-named-default
import { type JWT, default as fastifyJwt } from '@fastify/jwt';

interface AuthenticateOptions {
  JWT_SECRET: string;
}
export type Authenticate = (req: FastifyRequest, res: FastifyReply) => Promise<void>;
// 使用 declare 关键字声明增加 fastify 的全局变量
declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
  }
  interface FastifyInstance {
    authenticate: Authenticate;
  }
}
// 设置 token 过期时间10分钟
const authenticate: FastifyPluginAsync<AuthenticateOptions> = async (fastify, opts) => {
    fastify.register(fastifyJwt, {
      secret: opts.JWT_SECRET,
      sign: {
        expiresIn: '10m',
      },
    });

  const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      res.send(err);
    }
  };

  fastify.decorate('authenticate', authenticate);
  fastify.addHook('preHandler', (req, _rep, done) => {
    console.log('preHandler...', fastify.jwt);
    req.jwt = fastify.jwt;
    done();
  });
};

export default fp(authenticate, {
  fastify: '4.x',
  name: 'my-authenticate',
});
