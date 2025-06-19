// baas/server/src/routes/login.ts
import type { FastifyPluginAsync } from 'fastify';
import errors from 'http-errors';
import { UserModel } from '@monorepo/model';
import { UserService } from '@/service/index.js';

const login: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: UserModel.LoginSchema; Reply: UserModel.TokenSchema }>(
    '/login',
    {
      schema: {
        body: UserModel.loginSchema,
        response: {
          200: UserModel.tokenSchema,
        },
      },
    },
    async (req, rep) => {
      const { accountName } = req.body;
      let isValid;
      try {
        isValid = await UserService.login(req.body);
      } catch (e) {
        if (e instanceof Error) {
          throw new errors.InternalServerError(e.message);
        }
        throw new errors.InternalServerError('未知错误');
      }
      if (!isValid) {
        throw new errors.Unauthorized('用户名或密码错误');
      }
      rep.status(200).send({ token: fastify.jwt.sign({ accountName }) });
    },
  );
};

export default login;
