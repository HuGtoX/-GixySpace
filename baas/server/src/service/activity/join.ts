// baas/server/src/service/activity/join.ts
import type { ActivityModel } from '@monorepo/model';
import { getUserId } from './private/get-user-id.js';
import { checkActivityStatus } from './private/check-activity-status.js';
import { getActivity } from './private/get-activity.js';
import { prisma } from '@/utils/prisma.js';

export async function join(
  input: ActivityModel.JoinActivitySchema,
  accountName: string,
): Promise<void> {
  const userId = await getUserId(accountName);

  const activity = await getActivity(input.activityId);
  checkActivityStatus(activity, 'ONLINE');
  if (activity.publisherId === userId) {
    throw new Error('不能参加自己发起的活动');
  }
  if (activity.enrollmentEndTime < new Date()) {
    throw new Error('报名已结束');
  }
  if (activity.enrollmentStartTime > new Date()) {
    throw new Error('报名未开始');
  }

  // 当前被定的票数，被当成乐观锁版本使用
  const participantsCountCurrent = activity.participantsCount;
  if (participantsCountCurrent >= activity.maxParticipants) {
    throw new Error('活动人数已满');
  }
  const participantsCountNew = participantsCountCurrent + 1;

  const joined = await prisma.usersOnActivities.findFirst({
    where: {
      activityId: input.activityId,
      userId,
    },
  });
  if (joined) {
    throw new Error('已经参加过了');
  }

  console.log(
    `userId:${userId} activityId:${input.activityId} participantsCountCurrent:${participantsCountCurrent} participantsCountNew:${participantsCountNew}`,
  );
  // 如果两个用户同时在订票数为 10 时去参加活动，
  // 那么第一个用户参加成功，第二个用户参加失败
  await prisma.$transaction(async (tx) => {
    const res = await tx.activity.updateMany({
      where: {
        id: input.activityId,
        participantsCount: participantsCountCurrent,
      },
      data: {
        participantsCount: participantsCountNew,
      },
    });
    console.log(`${userId}`, res);
    if (res.count === 0) {
      throw new Error('发生冲突，请重试');
    }
    await tx.usersOnActivities.create({
      data: {
        activityId: input.activityId,
        userId,
      },
    });
  });
}
