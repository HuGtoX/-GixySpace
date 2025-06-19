// src/service/activity/publish.ts
import type { ActivityModel } from '@monorepo/model';
import { getUserId } from './private/get-user-id.js';
import { prisma } from '@/utils/prisma.js';

export async function publish(
  activityInput: ActivityModel.ActivitySchema,
  accountName: string,
): Promise<void> {
  const publisherId = await getUserId(accountName);
  const poster = activityInput.poster ?? {
    url: 'default.png',
    name: 'default.png',
    type: 'PNG',
  };
  if (
    new Date(activityInput.enrollmentStartTime).getTime() >
    new Date(activityInput.enrollmentEndTime).getTime()
  ) {
    throw new Error('报名开始时间不能晚于报名结束时间');
  }
  if (new Date(activityInput.enrollmentEndTime).getTime() < new Date().getTime()) {
    throw new Error('报名结束时间不能早于当前时间');
  }

  await prisma.activity.create({
    data: {
      name: activityInput.name,
      content: activityInput.content,
      location: activityInput.location,
      publisher: {
        connect: {
          id: publisherId,
        },
      },
      maxParticipants: activityInput.maxParticipants,
      enrollmentStartTime: new Date(activityInput.enrollmentStartTime),
      enrollmentEndTime: new Date(activityInput.enrollmentEndTime),
      activityPoster: {
        create: {
          url: poster.url,
          name: poster.name,
          type: poster.type,
          attributeType: 'ACTIVITY_POSTER',
        },
      },
    },
  });
}
