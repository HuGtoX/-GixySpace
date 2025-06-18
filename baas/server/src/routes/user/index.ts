// baas/server/src/routes/user/index.ts
import type { FastifyPluginAsync } from 'fastify';
import errors from 'http-errors';
import { UserModel } from '@monorepo/model';
import { UserService } from '@/service/index.js';

const user: FastifyPluginAsync = async (fastify) => {
  fastify.post<{
    Body: UserModel.CreatedSchema;
    Reply: UserModel.TokenSchema;
  }>(
    '/user',
    {
      schema: {
        body: UserModel.createdSchema,
        response: {
          200: UserModel.tokenSchema,
        },
      },
    },
    async (req, rep) => {
      try {
        const { accountName } = req.body;
        await UserService.create(req.body);
        req.log.info('创建用户');
        rep.status(200).send({ token: fastify.jwt.sign({ accountName }) });
      } catch (e) {
        req.log.error(e);
        if (e instanceof Error) {
          throw new errors.InternalServerError(e.message);
        }
        throw new errors.InternalServerError('未知错误');
      }
    },
  );

  fastify.get<{ Reply: UserModel.GetSchema }>(
    '/user',
    {
      onRequest: [fastify.authenticate],
      schema: {
        response: {
          200: UserModel.getSchema,
        },
      },
    },
    async (req, rep) => {
      req.log.info('user 路由被访问！');
      console.log(req.user);

      try {
        const userRes = await UserService.get(req.user.accountName);
        rep.status(200).send(userRes);
      } catch (e) {
        req.log.error(e);
        if (e instanceof Error) {
          throw new errors.InternalServerError(e.message);
        }
        throw new errors.InternalServerError('未知错误');
      }
    },
  );
};

export default user;
