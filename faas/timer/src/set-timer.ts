// src/set-timer.ts
import { Timer, type TimerMeta } from './timer.ts';
import { getId } from './utils/id.ts';

interface TimerOptions {
  delay: number;
  event: TimerMeta['event'];
}
export async function setTimer(options: TimerOptions) {
  const id = getId();
  const timer = new Timer(id, {
    receiveTime: new Date(Date.now()),
    triggerTime: new Date(Date.now() + options.delay),
    event: options.event,
  });
  await timer.start();
}
