import { Redis } from '@upstash/redis';

export default async (request: Request) => {
	const redis = new Redis({
		url: Netlify.env.get('UPSTASH_REDIS_URL')!,
		token: Netlify.env.get('UPSTASH_REDIS_TOKEN')!
	});

	try {
		const { fingerprint } = await request.json();
		const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

		if (!fingerprint) {
			throw new Error('Fingerprint is required');
		}

		// 检查今日是否已记录
		const isNewVisit = await redis.set(
			`visitor:${fingerprint}:${today}`,
			'1',
			{ nx: true, ex: 86400 * 7 } // 7天过期
		);

		if (isNewVisit === 'OK') {
			// 原子递增计数器
			await redis
				.pipeline()
				.incr(`visits:total`) // 总访问量
				.incr(`visits:daily:${today}`) // 每日访问量
				.exec();
		}

		return {
			result: null,
			config: {
				status: 200
			}
		};
	} catch (error) {
		throw new Error(`Error tracking visit: ${error.message}`);
	}
};
