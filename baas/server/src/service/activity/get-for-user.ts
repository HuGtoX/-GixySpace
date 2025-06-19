// src/service/activity/get-for-user.ts
import type { ActivityModel } from '@monorepo/model';
import { getAllOnlineActivities } from './private/get-all-online-activities.js';
import { getAllUserPublishActivities } from './private/get-all-user-publish-activities.js';
import { getUserJoinActivities } from './private/get-user-join-activities.js';
import { getUserId } from './private/get-user-id.js';

export async function getForUser(accountName: string): Promise<ActivityModel.ActivitiesSchema> {
  const userId = await getUserId(accountName);
  return {
    activities: await getAllOnlineActivities(userId),
    userPublishActivities: await getAllUserPublishActivities(userId),
    userJoinActivities: await getUserJoinActivities(userId),
  };
}
