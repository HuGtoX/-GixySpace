import type { Activity } from '@prisma/client';

export function checkActivityStatus(activity: Activity, status: Activity['status']): void {
  if (activity.status !== status) {
    throw new Error(`活动状态不匹配，期望${status}，实际${activity.status}`);
  }
}
