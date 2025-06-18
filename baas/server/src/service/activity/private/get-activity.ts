import type { Activity } from '@prisma/client';
import { prisma } from '@/utils/prisma.js';

export async function getActivity(activityId: number): Promise<Activity> {
  const activity = await prisma.activity.findUnique({
    where: {
      id: activityId,
    },
  });
  if (!activity) {
    throw new Error('活动不存在');
  }
  return activity;
}
