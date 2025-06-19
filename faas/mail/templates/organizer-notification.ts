import { templateDir } from '../consts.ts';
import { join } from '../deps.ts';
import { MailTemplate } from '../src/mail-template.ts';

export const organizerNotification = new MailTemplate(
  await Deno.readTextFile(join(templateDir, 'organizer-notification.tmpl')),
  {
    activityName: 'string',
    time: 'string',
    number: 'string',
  },
  '活动通知',
);
