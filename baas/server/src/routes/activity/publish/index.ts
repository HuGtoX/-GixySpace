// baas/server/src/routes/activity/publish/index.ts
import type { FastifyPluginAsync } from 'fastify';
import { ActivityModel } from '@monorepo/model';
import errors from 'http-errors';
import { ActivityService } from '@/service/index.js';
const users: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: ActivityModel.ActivitySchema }>(
    '/activity/publish',
    {
      onRequest: [fastify.authenticate],
      schema: {
        body: ActivityModel.activitySchema,
      },
    },
    async (req, rep) => {
      try {
        req.log.info('创建活动');
        await ActivityService.publish(req.body, req.user.accountName);
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
