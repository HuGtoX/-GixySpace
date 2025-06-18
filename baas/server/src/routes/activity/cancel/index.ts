// src/routes/activity/cancel/index.ts
import type { FastifyPluginAsync } from 'fastify';
import { ActivityModel } from '@monorepo/model';
import errors from 'http-errors';
import { ActivityService } from '@/service/index.js';

const users: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: ActivityModel.ActivityIdSchema }>(
    '/activity/cancel',
    {
      onRequest: [fastify.authenticate],
      schema: {
        body: ActivityModel.activityIdSchema,
      },
    },
    async (req, rep) => {
      try {
        const { activityId } = req.body;
        req.log.info(`user 用户取消活动 id 为  ${activityId}`);
        await ActivityService.cancel(activityId, req.user.accountName);
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
