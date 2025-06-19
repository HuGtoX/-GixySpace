import { writeRequestStream } from '../service/mod.ts';
import { log } from '../utils/logger.ts';
import { Status } from './deps.ts';
import { HandlerOptions } from './types.ts';

export async function putHandler({
	req,
	id
}: HandlerOptions): Promise<Response> {
	const relativePath = new URL(req.url).pathname.replace('/s3/v1', '');
	try {
		const { size, version } = await writeRequestStream(relativePath, req);

		return new Response(JSON.stringify({ version }), {
			status: Status.Created,
			headers: {
				'content-length': size.toString()
			}
		});
	} catch (err) {
		console.error(err);
		// @ts-ignore: 可能存在 TypeScript 无法正确推断类型的情况，暂时忽略类型检查以保证代码能正常运行
		log.critical(`${id} [put][controller] 捕获异常：${err.message}`);
		return new Response(null, { status: Status.InternalServerError });
	}
}
