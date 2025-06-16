import { getFileStream } from '../service/mod.ts';
import { log } from '../utils/logger.ts';
import { Status } from './deps.ts';
import { HandlerOptions } from './types.ts';
import { getContentType } from './get-content-type.ts';

export async function getHandler({ req, id }: HandlerOptions): Promise<Response> {
  const relativePath = new URL(req.url).pathname.replace('/s3/v1', '');
  try {
    const { size, fileStream } = await getFileStream(relativePath);
    return new Response(fileStream, {
      status: Status.OK,
      headers: {
        'content-length': size.toString(),
        'content-type': getContentType(relativePath),
      },
    });
  } catch (err) {
    log.critical(`${id} [get][controller] 捕获异常 ${err.message}`);
    if (err instanceof Deno.errors.NotFound) {
      return new Response(null, { status: Status.NotFound });
    }
    if (err instanceof Deno.errors.BadResource) {
      return new Response(null, { status: Status.UnprocessableEntity });
    }
    return new Response(null, { status: Status.InternalServerError });
  }
}
