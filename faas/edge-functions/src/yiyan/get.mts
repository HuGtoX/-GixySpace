import { DailySentence } from '@gixy/types/yiyan.ts';
import { eq, sql } from 'drizzle-orm';
import postgres from 'postgres';
import { dailySentences } from '../../common/schema.ts';
import { drizzle } from 'drizzle-orm/postgres-js';

/**
 * https://developer.hitokoto.cn/sentence/
 * 每日一言
 * @param _
 * @returns DayliSentence
 */
async function getDailySentence(_: Request) {
	const queryClient = postgres(Netlify.env.get('DATABASE_URL')!);
	const db = drizzle({ client: queryClient, schema: { dailySentences } });

	// 获取今天的日期
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// 查询今天是否已经有一言
	const existingSentence = await db.query.dailySentences.findFirst({
		where: eq(dailySentences.fetchDate, sql`CURRENT_DATE`)
	});

	if (existingSentence) {
		return {
			result: JSON.parse(existingSentence.fetchData ?? '{}')
		};
	}

	const data = await fetch('https://international.v1.hitokoto.cn?c=k');

	if (!data.ok) {
		throw new Error('每日一言获取失败');
	}

	const result: DailySentence = await data.json();

	// 保存到数据库
	await db.insert(dailySentences).values({
		content: result.hitokoto,
		fetchData: JSON.stringify(result),
		from: result.from
	});

	return {
		result
	};
}

export default getDailySentence;
