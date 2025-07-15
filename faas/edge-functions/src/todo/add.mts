import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { todos } from '../../common/schema.ts';

export default async (req: Request) => {
	// 获取访客ID和请求数据
	const guestId = req.headers.get('X-Guest-ID') || '';

	if (!guestId) {
		return { result: { error: '访客ID不存在' }, config: { status: 400 } };
	}

	const { text } = await req.json();
	if (!text || typeof text !== 'string' || text.trim().length === 0) {
		return {
			result: { error: '任务内容不能为空' },
			config: { status: 400 }
		};
	}

	// 连接数据库
	const queryClient = postgres(Netlify.env.get('DATABASE_URL')!);
	const db = drizzle({ client: queryClient });

	try {
		// 创建新待办事项
		const newTodo = {
			text: text.trim(),
			completed: false,
			archived: false,
			guestId
		};

		const result = await db
			.insert(todos)
			.values(newTodo)
			.returning({ id: todos.id });
		const newId = result[0].id;
		return { result: { todo: { ...newTodo, id: newId } } };
	} catch (error) {
		console.error('添加待办事项失败:', error);
		return {
			result: { error: '添加待办事项失败' },
			config: { status: 500 }
		};
	} finally {
		// 关闭数据库连接
		await queryClient.end();
	}
};
