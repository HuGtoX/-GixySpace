import { Context } from '../../../deps.ts';
import { healthStatus } from '../service/health-status.ts';

export function getHandler(ctx: Context) {
	ctx.response.body = { ...healthStatus() };
}
