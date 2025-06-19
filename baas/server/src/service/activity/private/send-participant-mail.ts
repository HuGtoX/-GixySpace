// src/service/activity/private/send-participant-mail.ts
// eslint-disable-next-line max-params
export async function sendParticipantMail(
    toMail: string,
    activityName: string | undefined,
    time: string | undefined,
    location: string | undefined,
    publisherName: string | undefined,
  ): Promise<void> {
    await fetch('http://localhost:8000/api/v1/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toMail,
        topic: 'participateNotification',
        args: { activityName, time, location, publisherName },
      }),
    });
  }
