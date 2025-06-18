// src/req-handler.ts
import { Status } from '../deps.ts';
import { setTimer } from './set-timer.ts';
import { httpEvent } from './timer.ts';

// POST  /v1/timer/register
export function handlerMaker(method: string, pathPattern: string) {
  return async function reqHandler(req: Request) {
    if (req.method !== method) {
      // 仅处理 method 请求
      return new Response(null, { status: Status.MethodNotAllowed });
    }
    const { pathname: path } = new URL(req.url);
    if (path !== pathPattern) {
      // 仅允许 pathPattern 路径
      return new Response(null, { status: Status.NotFound });
    }
    if (
      !req.headers.has('content-type') ||
      !req.headers.get('content-type')?.startsWith('application/json') ||
      !req.body
    ) {
      return new Response(null, { status: Status.UnsupportedMediaType });
    }
    const bodyJson = await req.json();
    const delay = bodyJson.delay;
    const event = bodyJson.event;
    if (!event || !delay) {
      // 必须有 event 和 delay 参数
      return new Response(null, { status: Status.BadRequest });
    }

    if (typeof delay !== 'number' || delay < 0) {
      // delay 参数不合法
      return new Response(null, { status: Status.BadRequest });
    }
    // 使用 zod 验证 event 参数
    if (httpEvent.safeParse(event).success === false) {
      // event 参数不合法
      return new Response(null, { status: Status.BadRequest });
    }

    try {
      await setTimer({
        delay,
        event,
      });
    } catch (_e) {
      return new Response(null, { status: Status.InternalServerError });
    }

    return new Response(null, {
      status: Status.OK,
    });
  };
}
