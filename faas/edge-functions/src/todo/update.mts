import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { todos } from '../../common/schema.ts';
import { eq } from 'drizzle-orm';

export default async (req: Request) => {
	// 获取访客ID和请求数据
	const guestId = req.headers.get('X-Guest-ID') || '';
	if (!guestId) {
		return { result: { error: '访客ID不存在' }, config: { status: 400 } };
	}

	const { id, completed, archived } = await req.json();
	if (!id || typeof completed !== 'boolean') {
		return { result: { error: '无效的请求参数' }, config: { status: 400 } };
	}

	// 连接数据库
	const queryClient = postgres(Netlify.env.get('DATABASE_URL')!);
	const db = drizzle({ client: queryClient });

	try {
		// 更新待办事项状态
		const result = await db
			.update(todos)
			.set({ completed, archived, updatedAt: new Date().toISOString() })
			.where(eq(todos.id, id))
			.returning();

		if (result.length === 0) {
			return {
				result: { error: '待办事项不存在' },
				config: { status: 404 }
			};
		}

		return { result: { todo: result[0] } };
	} catch (error) {
		console.error('更新待办事项失败:', error);
		return {
			result: { error: '更新待办事项失败' },
			config: { status: 500 }
		};
	} finally {
		// 关闭数据库连接
		await queryClient.end();
	}
};
