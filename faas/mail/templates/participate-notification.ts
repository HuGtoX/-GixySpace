import { templateDir } from '../consts.ts';
import { join } from '../deps.ts';
import { MailTemplate } from '../src/mail-template.ts';

export const participateNotification = new MailTemplate(
  await Deno.readTextFile(join(templateDir, 'participate-notification.tmpl')),
  {
    activityName: 'string',
    time: 'string',
    location: 'string',
    publisherName: 'string',
  },
  '参与提醒',
);
