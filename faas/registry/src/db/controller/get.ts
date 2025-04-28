import { Context } from '../../../deps.ts';
import { getAll } from '../service/get-all.ts';

export function getHandler(ctx: Context) {
	ctx.response.body = {
		db: getAll()
	};
}
