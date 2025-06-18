export function getVerificationCode(): string {
    return Math.random().toString().slice(2, 8);
  }
