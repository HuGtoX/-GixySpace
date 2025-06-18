// src/service/activity/cancel.ts
import { sendCancelMail } from './private/send-cancel-mail.js';
import { checkActivityPublisher } from './private/check-activity-publisher.js';
import { getUserId } from './private/get-user-id.js';
import { getActivity } from './private/get-activity.js';
import { checkActivityStatus } from './private/check-activity-status.js';
import { prisma } from '@/utils/prisma.js';

export async function cancel(activityId: number, accountName: string): Promise<void> {
  const publisherId = await getUserId(accountName);
  const activity = await getActivity(activityId);
  checkActivityPublisher(activity, publisherId);
  checkActivityStatus(activity, 'ONLINE');
  await prisma.activity.update({
    where: {
      id: activityId,
    },
    data: {
      status: 'CANCELLED',
    },
  });

  const emailListResult = await prisma.usersOnActivities.findMany({
    where: { activityId },
    select: {
      user: {
        select: { email: true },
      },
    },
  });
  const activityName = await prisma.activity.findUnique({
    where: { id: activityId },
    select: {
      name: true,
    },
  });
  const publisherName = await prisma.user.findUnique({
    where: { id: publisherId },
    select: {
      accountName: true,
    },
  });
  for (const email of emailListResult) {
    sendCancelMail(email.user.email, activityName?.name, publisherName?.accountName);
  }
}
