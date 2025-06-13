// src/registry/controller/post.ts
import { register } from '../service/register.ts';
import { Context, Status } from '../../../deps.ts';
export async function postHandler(ctx: Context) {
  if (!(ctx.request.headers.get('content-type') === 'application/json' && ctx.request.hasBody)) {
    // 只接受 json 格式的 content-type，否则返回 415
    ctx.response.status = Status.UnsupportedMediaType;
    return;
  }
  const res = ctx.request.body({ type: 'json' });
  const req = await res.value;
  const path = req.path;
  const filePath = req.filePath;

  if (!path || !filePath || !Array.isArray(path)) {
    // path 和 filePath 都是必填项，且 path 必须是数组，否则返回 400
    ctx.response.status = Status.BadRequest;
    return;
  }
  let port;
  try {
    port = register({
      path,
      filePath,
    });
  } catch (e) {
    // 如果注册失败，返回 500
    ctx.response.status = Status.InternalServerError;
    if (e instanceof Deno.errors.AlreadyExists) {
      // 如果路径已经注册，返回错误信息
      ctx.response.body = {
        errMsg: e.message,
      };
    }
    return;
  }
  // 所有拦截都通过，则返回端口号，以便客户端使用
  ctx.response.body = {
    port,
  };
}
