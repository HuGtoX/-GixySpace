// src/service/activity/private/get-all-online-activities.ts
import type { ActivityModel } from '@monorepo/model';
import { getUserJoinActivitiesRecord } from './get-user-join-activities.js';
import { prisma } from '@/utils/prisma.js';
export async function getAllOnlineActivities(
  userId: number,
): Promise<ActivityModel.ActivitiesSchema['activities']> {
  const activities = await prisma.activity.findMany({
    where: {
      status: 'ONLINE',
    },
    include: {
      activityPoster: true,
    },
  });

  const userJoinActivitiesIds = (await getUserJoinActivitiesRecord(userId)).map(
    (record) => record.activityId,
  );

  return (
    activities
      // 过滤用户自己发起的活动
      .filter((activity) => activity.publisherId !== userId)
      // 过滤用户已经参加的活动
      .filter((activity) => !userJoinActivitiesIds.includes(activity.id))
      .map((activity) => ({
        id: activity.id,
        status: activity.status,
        poster: {
          url: activity.activityPoster.url,
          name: activity.activityPoster.name,
          type: activity.activityPoster.type,
          attributeType: activity.activityPoster.attributeType,
        },
        enrollmentStartTime: activity.enrollmentStartTime.toString(),
        enrollmentEndTime: activity.enrollmentEndTime.toString(),
        name: activity.name,
        content: activity.content,
        location: activity.location,
        maxParticipants: activity.maxParticipants,
        participantsCount: activity.participantsCount,
      }))
  );
}
