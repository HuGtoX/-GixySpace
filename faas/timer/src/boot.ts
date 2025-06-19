// faas/timer/src/boot.ts
import { baseStoreDir, timerStoreDir } from '../consts.ts';
import { expandGlob } from '../deps.ts';
import { Timer, type TimerMeta } from './timer.ts';

export async function boot() {
  // 从本地存储中读取所有的 timer
  for await (const file of expandGlob(`${baseStoreDir}/${timerStoreDir}/**/data.json`)) {

    const id = parseInt(file.path.split('/').slice(-2)[0]);
    const data = await Deno.readTextFile(file.path);
    const options: TimerMeta = JSON.parse(data);
    options.receiveTime = new Date(options.receiveTime);
    options.triggerTime = new Date(options.triggerTime);
    const timer = new Timer(id, options);
    await timer.start();
  }
}
