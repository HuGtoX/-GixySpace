export async function sendVerificationCodeMail(
    toMail: string,
    verificationCode: string,
  ): Promise<void> {
    await fetch('http://localhost:8000/api/v1/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toMail,
        topic: 'verificationCode',
        args: { emailCode: verificationCode },
      }),
    });
  }
