// src/routes/activity/done/index.ts
import type { FastifyPluginAsync } from 'fastify';
import { ActivityModel } from '@monorepo/model';
import errors from 'http-errors';
import { ActivityService } from '@/service/index.js';
const users: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: ActivityModel.ActivityIdSchema }>(
    '/activity/done',
    {
      onRequest: [fastify.authenticate],
      schema: {
        body: ActivityModel.activityIdSchema,
      },
    },
    async (req, rep) => {
      try {
        const { activityId } = req.body;
        req.log.info(`完成活动 ${activityId}`);
        await ActivityService.done(activityId);
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
