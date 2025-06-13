// src/registry/controller/delete.ts
import { Context, Status } from '../../../deps.ts';
import { deleteApi } from '../service/delete-api.ts';

export async function deleteHandler(ctx: Context) {
  if (!(ctx.request.headers.get('content-type') === 'application/json' && ctx.request.hasBody)) {
    // 只接受 json 格式的 content-type，否则返回 415
    ctx.response.status = Status.UnsupportedMediaType;
    return;
  }
  const res = ctx.request.body({ type: 'json' });
  const req = await res.value;
  const filePath = req.filePath;
  if (!filePath) {
    // filePath 是必填项，否则返回 400
    ctx.response.status = Status.BadRequest;
    return;
  }
  try {
    deleteApi(filePath);
    ctx.response.status = Status.OK;
  } catch (e) {
    // 如果删除失败，返回 500
    ctx.response.status = Status.InternalServerError;
    if (e instanceof Deno.errors.NotFound) {
      ctx.response.body = {
        errMsg: '该路径还未注册！',
      };
    }
  }
}
