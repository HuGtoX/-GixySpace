import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { todos } from '../../common/schema.ts';
import { eq, desc } from 'drizzle-orm';

export default async (req: Request) => {
	// 获取访客ID（假设从请求头或cookie中获取）
	const guestId = req.headers.get('X-Guest-ID') || '';
	if (!guestId) {
		return { result: { error: '访客ID不存在' }, config: { status: 400 } };
	}

	// 连接数据库
	const queryClient = postgres(Netlify.env.get('DATABASE_URL')!);
	const db = drizzle({ client: queryClient });

	try {
		// 查询未归档的待办事项
		const result = await db
			.select()
			.from(todos)
			.where(eq(todos.guestId, guestId))
			.orderBy(desc(todos.createdAt));

		return { result: { todos: result } };
	} catch (error) {
		console.error('获取待办事项失败:', error);
		return {
			result: { error: '获取待办事项失败' },
			config: { status: 500 }
		};
	} finally {
		// 关闭数据库连接
		await queryClient.end();
	}
};
