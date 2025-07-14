import { DailySentence } from '@gixy/types/yiyan.ts';

/**
 * https://developer.hitokoto.cn/sentence/
 * 每日一言
 * @param _
 * @returns DayliSentence
 */
async function updateDailySentence(request: Request) {
	const url = new URL(request.url);
	const params = Object.fromEntries(url.searchParams.entries());

	console.log('-- [ params ] --', params);

	const data = await fetch('https://international.v1.hitokoto.cn?c=k');

	if (!data.ok) {
		throw new Error('每日一言获取失败');
	}

	const result: DailySentence = await data.json();

	console.log('-- [ result ] --', result);

	return {
		result
	};
}

export default updateDailySentence;
