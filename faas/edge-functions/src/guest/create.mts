import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { guests } from '../../common/schema.ts';
import { Context } from '@netlify/edge-functions';

export default async (req: Request, context: Context) => {
	const userAgent = req.headers.get('user-agent') || ''; // 从请求头获取用户代理

	const { guestId } = await req.json();

	const queryClient = postgres(Netlify.env.get('DATABASE_URL')!);
	const db = drizzle({ client: queryClient });

	// 创建访客记录（填充实际字段）
	await db.insert(guests).values({
		id: guestId,
		userAgent,
		ipHash: context.ip,
		fingerprint: req.headers.get('sec-ch-ua') || ''
	});

	return {
		result: { success: true, guestId }
	};
};
