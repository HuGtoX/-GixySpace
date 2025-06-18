import type { FastifyPluginAsync } from 'fastify';
import { UserModel } from '@monorepo/model';
import { UserService } from '@/service/index.js';

const user: FastifyPluginAsync = async (fastify) => {
  fastify.post<{
    Body: UserModel.SendVerificationCodeSchema;
  }>(
    '/user/verification-code',
    {
      schema: {
        body: UserModel.sendVerificationCodeSchema,
      },
    },
    async (req, rep) => {
        console.log('req.body', req.body);

      try {
        await UserService.sendVerificationCode(req.body);
      } catch (e) {
        rep.log.error(e);
        if (e instanceof Error) {
          rep.status(500).send({ message: e.message });
        }
        rep.status(500).send({ message: '未知错误' });
      }
    },
  );
};

export default user;
