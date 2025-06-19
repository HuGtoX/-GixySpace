// src/service/activity/private/get-all-user-join-activities.ts
import type { ActivityModel } from '@monorepo/model';
import { prisma } from '@/utils/prisma.js';
export async function getAllUserPublishActivities(
  userId: number,
): Promise<ActivityModel.ActivitiesSchema['userPublishActivities']> {
  const activities = await prisma.activity.findMany({
    where: {
      publisherId: userId,
    },
    include: {
      activityPoster: true,
    },
  });
  return activities.map((activity) => ({
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
  }));
}
