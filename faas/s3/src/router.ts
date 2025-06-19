import { getHandler } from './controller/get.ts';
import { putHandler } from './controller/put.ts';
import { Status } from '../deps.ts';
import { log } from './utils/logger.ts';
import { appendTrackingId } from './utils/append-tracking-id.ts';

export async function route(req: Request): Promise<Response> {
	let rep: Response;
	const id = await crypto.randomUUID();
	try {
		if (req.method == 'GET') {
			rep = await getHandler({ id, req });
		} else if (req.method == 'PUT') {
			rep = await putHandler({ id, req });
		} else {
			rep = new Response(null, { status: Status.MethodNotAllowed });
		}
	} catch (err) {
		// @ts-ignore: 可能存在 TypeScript 无法正确推断类型的情况，暂时忽略类型检查以保证代码能正常运行
		log.critical(`${id} [router] 捕获异常: ${err.message}`);
		rep = new Response(null, { status: Status.InternalServerError });
	}
	appendTrackingId(rep, id);
	log.info(
		`${id} ${req.method} ${req.url} ${rep.status} ${
			rep.headers.has('content-length') ? rep.headers.get('content-length') : 0
		} 字节`
	);
	return rep;
}
