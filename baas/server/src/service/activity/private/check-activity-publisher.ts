// src/service/activity/private/check-activity-publisher.ts
import type { Activity } from '@prisma/client';

export function checkActivityPublisher(activity: Activity, publisherId: number): void {
  if (activity.publisherId !== publisherId) {
    throw new Error('活动发起者不匹配');
  }
}
