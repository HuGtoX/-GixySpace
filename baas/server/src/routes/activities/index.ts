// src/routes/activities/index.ts
import type { FastifyPluginAsync } from 'fastify';
import { ActivityModel } from '@monorepo/model';
import { ActivityService } from '@/service/index.js';

const user: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Reply: ActivityModel.ActivitiesSchema }>(
    '/activities',
    {
      onRequest: [fastify.authenticate],
      schema: {
        response: {
          200: ActivityModel.activitiesSchema,
        },
      },
    },
    async (req, rep) => {
      const activities = await ActivityService.getForUser(req.user.accountName);
      rep.status(200).send(activities);
    },
  );
};

export default user;
