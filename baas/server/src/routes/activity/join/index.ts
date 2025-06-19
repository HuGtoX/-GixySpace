// src/routes/activity/join/index.ts
import type { FastifyPluginAsync } from 'fastify';
import { ActivityModel } from '@monorepo/model';
import errors from 'http-errors';
import { ActivityService } from '@/service/index.js';

const users: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: ActivityModel.JoinActivitySchema }>(
    '/activity/join',
    {
      onRequest: [fastify.authenticate],
      schema: {
        body: ActivityModel.joinActivitySchema,
      },
    },
    async (req, rep) => {
      try {
        req.log.info(`用户 ${req.user.accountName} 加入活动 ${req.body.activityId}`);
        await ActivityService.join(req.body, req.user.accountName);
        rep.status(200);
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

export default users;
