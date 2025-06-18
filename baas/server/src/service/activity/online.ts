import { checkActivityPublisher } from './private/check-activity-publisher.js';
import { getUserId } from './private/get-user-id.js';
import { getActivity } from './private/get-activity.js';
import { checkActivityStatus } from './private/check-activity-status.js';
import { prisma } from '@/utils/prisma.js';

export async function online(activityId: number, accountName: string): Promise<void> {
  const publisherId = await getUserId(accountName);
  const activity = await getActivity(activityId);
  checkActivityPublisher(activity, publisherId);
  checkActivityStatus(activity, 'PREPARE');

  if (activity.enrollmentEndTime < new Date()) {
    throw new Error('当前时间已超过报名截止时间！');
  }

 // 活动结束后，调用 Done 计时器接口
 await fetch('http://localhost:8000/api/v1/timer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          delay: activity.enrollmentEndTime.getTime() - new Date().getTime(),
          event: {
            type: 'http',
            url: 'http://localhost:3000/v1/activity/done',
            method: 'POST',
            body: {
              activityId,
            },
            headers: {
              'content-type': 'application/json',
            },
          },
        }),
      });

  await prisma.activity.update({
    where: {
      id: activityId,
    },
    data: {
      status: 'ONLINE',
    },
  });


}
