import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { guests } from '../../common/schema.ts';
import { Context } from '@netlify/edge-functions';

export default async (req: Request, context: Context) => {
	const userAgent = req.headers.get('user-agent') || ''; // 从请求头获取用户代理

	const queryClient = postgres(Netlify.env.get('DATABASE_URL')!);
	const db = drizzle({ client: queryClient });

	// 创建访客记录（填充实际字段）
	const data = await db.insert(guests).values({
		userAgent,
		ipHash: context.ip,
		fingerprint: req.headers.get('sec-ch-ua') || '' // 示例指纹（可根据实际需求调整）
	});

	console.log('-- [ data ] --', data);

	return new Response(JSON.stringify({ success: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
