import { templateDir } from '../consts.ts';
import { join } from '../deps.ts';
import { MailTemplate } from '../src/mail-template.ts';

export const cancelNotification = new MailTemplate(
  await Deno.readTextFile(join(templateDir, 'cancel-notification.tmpl')),
  {
    activityName: 'string',
    publisherName: 'string',
  },
  '取消通知',
);
