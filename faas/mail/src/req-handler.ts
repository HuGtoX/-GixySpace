// req-handler.ts
import { Status } from '../deps.ts';
import { sendMail } from './send-mail.ts';
import { isTemplateDictKey, templateDict } from './template-dict.ts';

// POST   /v1/mail/send
export function handlerMaker(method: string, pathPattern: string) {
	return async function reqHandler(req: Request) {
		console.log('-- [ req ] --', req);
		if (req.method !== method) {
			// 仅处理 method 请求
			return new Response(null, { status: Status.MethodNotAllowed });
		}
		const { pathname: path } = new URL(req.url);
		if (path !== pathPattern) {
			// 仅允许 pathPattern 路径
			return new Response(null, { status: Status.NotFound });
		}
		let topic: keyof typeof templateDict;
		let args;
		let toMail;
		if (
			req.headers.has('content-type') &&
			req.headers.get('content-type')?.startsWith('application/json') &&
			req.body
		) {
			const bodyJson = await req.json();
			console.log('-- [ received bodyJson ] --', bodyJson);
			topic = bodyJson.topic;
			args = bodyJson.args;
			toMail = bodyJson.toMail;
		} else {
			return new Response(null, { status: Status.UnsupportedMediaType });
		}
		if (!topic || !args || !toMail || !isTemplateDictKey(topic)) {
			// 必须有 topic 和 args 参数
			return new Response(null, { status: Status.BadRequest });
		}
		const templateInstance = templateDict[topic];
		console.log('-- [ templateInstance ] --', templateInstance);
		if (!templateInstance) {
			// 未找到对应的模板
			return new Response(null, { status: Status.NoContent });
		}
		if (!templateInstance.isArgsValid(Object.keys(args))) {
			// 参数不合法
			return new Response(null, { status: Status.BadRequest });
		}

		console.log('-- [ templateInstance ] --', templateInstance);
		const { subject, html } = templateInstance.render(args);
		try {
			console.log('sendMail', toMail, subject, html);
			await sendMail(toMail, subject, html);
			console.log('发送邮件成功');
		} catch (_e) {
			// @ts-ignore: 可能存在 TypeScript 无法正确推断类型的情况，暂时忽略类型检查以保证代码能正常运行
			console.log(_e.message);
			return new Response(null, { status: Status.InternalServerError });
		}

		return new Response(null, {
			status: Status.OK
		});
	};
}
