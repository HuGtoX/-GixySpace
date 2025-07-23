import { Redis } from '@upstash/redis';
import { GuestVisitStats } from '@gixy/types/guest.ts';

type StatsEndpointResponse = Promise<{
	result: GuestVisitStats;
}>;
// 获取统计数据的端点
export const config = { path: '/api/stats' };
export default async function statsEndpoint(): StatsEndpointResponse {
	const redis = new Redis({
		url: Netlify.env.get('UPSTASH_REDIS_URL')!,
		token: Netlify.env.get('UPSTASH_REDIS_TOKEN')!
	});

	const today = new Date().toISOString().split('T')[0];

	const [total, daily] = await Promise.all([
		redis.get<number>('visits:total') || 0,
		redis.get<number>(`visits:daily:${today}`) || 0
	]);

	return {
		result: { total, daily }
	};
}
