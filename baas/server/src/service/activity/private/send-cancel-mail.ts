export async function sendCancelMail(
  toMail: string,
  activityName: string | undefined,
  publisherName: string | undefined,
): Promise<void> {
  await fetch('http://localhost:8000/api/v1/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      toMail,
      topic: 'cancelNotification',
      args: { activityName, publisherName },
    }),
  });
}
