// src/routes/activity/online/index.ts
import type { FastifyPluginAsync } from 'fastify';
import { ActivityModel } from '@monorepo/model';
import errors from 'http-errors';
import { ActivityService } from '@/service/index.js';
const users: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: ActivityModel.ActivityIdSchema }>(
    '/activity/online',
    {
      onRequest: [fastify.authenticate],
      schema: {
        body: ActivityModel.activityIdSchema,
      },
    },
    async (req, rep) => {
      const { activityId } = req.body;
      try {
        req.log.info(`上线活动 ${activityId}`);
        await ActivityService.online(activityId, req.user.accountName);
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
