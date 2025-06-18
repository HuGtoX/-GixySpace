// eslint-disable-next-line max-params
export async function sendOrganizerMail(
    toMail: string,
    activityName: string | undefined,
    time: string | undefined,
    number: string | undefined,
  ): Promise<void> {
    await fetch('http://localhost:8000/api/v1/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toMail,
        topic: 'organizerNotification',
        args: { activityName, time, number },
      }),
    });
  }
