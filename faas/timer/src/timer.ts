// src/timer.ts
import { Store } from './store.ts';
import { log } from './utils/logger.ts';
import { timerStoreDir } from '../consts.ts';
import { z } from '../deps.ts';
// 使用 zod 对 http 事件进行类型校验
export const httpEvent = z.object({
  type: z.literal('http'),
  url: z.string(),
  method: z.string(),
  headers: z.record(z.string()),
  body: z.any(),
});
// 获取 zod 校验后的类型
type HttpEvent = z.infer<typeof httpEvent>;
// 定义 TimerMeta 类型，存储定时器的元数据
export interface TimerMeta {
  receiveTime: Date;
  triggerTime: Date;
  event: HttpEvent;
}
export class Timer extends Store<TimerMeta> {
  private timerId!: number;
  public constructor(id: number, private meta: TimerMeta) {
    super({
      id,
      prefix: timerStoreDir,
      data: meta,
    });
  }
  public async start() {
    await this.save();
    const delay = this.meta.triggerTime.getTime() - new Date(Date.now()).getTime();
    if (delay > 0) {
      this.timerId = setTimeout(async () => {
        await this.trigger();
      }, delay);
      return {
        status: 'timer-started',
        timerId: this.timerId,
      };
    } else {
      await this.trigger();
      return {
        status: 'timer-triggered',
      };
    }
  }
  public getTimerId() {
    return this.timerId;
  }
  public async cancel() {
    clearTimeout(this.timerId);
    await this.delete();
    log.info(`取消任务: ${JSON.stringify(this.meta)}`);
  }
  public async trigger() {
    const { event } = this.meta;
    switch (event.type) {
      case 'http':
        await this.httpEvent(event);
        break;
      default:
        log.error(`未知的任务类型: ${event.type}`);
    }
  }

  private async getAuth() {
    const bodyString = JSON.stringify({
      accountName: Deno.env.get('TIMER_ADMIN'),
      password: Deno.env.get('TIMER_ADMIN_PASSWORD'),
    });
    const headers = { 'content-type': 'application/json' };
    const req = new Request('http://localhost:3000/v1/login', {
      method: 'POST',
      body: bodyString,
      headers,
    });
    const res = await fetch(req);
    const token = await res.json();
    return token.token;
  }

  private async httpEvent({ url, method, body, headers }: HttpEvent) {
    const bodyString = JSON.stringify(body);
    const requestLog = `请求: url:${url} method:${method} body:${bodyString} header:${JSON.stringify(
      headers,
    )}`;
    const token = await this.getAuth();
    headers.Authorization = `Bearer ${token}`;
    const req = new Request(url, {
      method,
      body: bodyString,
      headers,
    });
    const res = await fetch(req);
    log.info(`触发任务: ${requestLog} status:${res.status}`);
    if (res.status === 200) {
      try {
        // 只有执行成功才删除任务
        this.delete();
        log.info(`任务触发完成，删除任务: ${requestLog}`);
      } catch (e) {
        log.error(`任务触发完成，删除任务失败: ${e.message}`);
      }
    } else {
      // 任务失败
      log.error(`触发任务失败: ${requestLog} status:${res.status} 错误日志：${await res.text()}`);
    }
  }
}
