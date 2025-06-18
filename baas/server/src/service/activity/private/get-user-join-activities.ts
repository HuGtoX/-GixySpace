// src/service/activity/private/get-user-join-activities.ts
import type { ActivityModel } from '@monorepo/model';
import type { Activity, File, UsersOnActivities } from '@prisma/client';
import { prisma } from '@/utils/prisma.js';

export async function getUserJoinActivitiesRecord(userId: number): Promise<
  (UsersOnActivities & {
    activity: Activity & {
      activityPoster: File;
    };
  })[]
> {
  return prisma.usersOnActivities.findMany({
    where: {
      userId,
    },
    include: {
      activity: {
        include: {
          activityPoster: true,
        },
      },
    },
  });
}
export async function getUserJoinActivities(
  userId: number,
): Promise<ActivityModel.ActivitiesSchema['userJoinActivities']> {
  const usersOnActivities = await getUserJoinActivitiesRecord(userId);

  return usersOnActivities.map(({ activity }) => ({
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
