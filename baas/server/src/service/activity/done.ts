// src/service/activity/done.ts
import { sendParticipantMail } from './private/send-participant-mail.js';
import { sendOrganizerMail } from './private/send-organizer-mail.js';
import { getActivity } from './private/get-activity.js';
import { checkActivityStatus } from './private/check-activity-status.js';
import { prisma } from '@/utils/prisma.js';

export async function done(activityId: number): Promise<void> {
  const activity = await getActivity(activityId);
  checkActivityStatus(activity, 'ONLINE');
  await prisma.activity.update({
    where: {
      id: activityId,
    },
    data: {
      status: 'DONE',
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
  const activityInfo = await prisma.activity.findUnique({
    where: { id: activityId },
    select: {
      name: true,
      enrollmentEndTime: true,
      location: true,
      publisherId: true,
    },
  });
  const publisher = await prisma.user.findUnique({
    where: { id: activityInfo!.publisherId },
    select: {
      accountName: true,
      email: true,
    },
  });
  for (const email of emailListResult) {
    sendParticipantMail(
      email.user.email,
      activityInfo?.name,
      activityInfo?.enrollmentEndTime.toISOString(),
      activityInfo?.location,
      publisher?.accountName,
    );
  }
  sendOrganizerMail(
    publisher!.email,
    activityInfo?.name,
    activityInfo?.enrollmentEndTime.toISOString(),
    emailListResult?.length.toString(),
  );
}
