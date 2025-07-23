import { assertEquals } from 'std/assert';
import updateDailySentence from '../src/yiyan/update.mts';
import { DailySentence } from '@gixy/types/yiyan.ts';

// 模拟 fetch 实现
const originalFetch = globalThis.fetch;

Deno.test('updateDailySentence - 正常返回每日一言', async () => {
	// 模拟成功响应
	const mockData: DailySentence = {
		id: 123,
		hitokoto: '测试句子',
		type: 'k',
		from: '测试来源',
		from_who: '测试作者',
		creator: '测试创建者',
		creator_uid: 1,
		reviewer: 1,
		commit_from: 'test-commit-from',
		uuid: 'test-uuid',
		created_at: '2023-01-01T00:00:00+08:00',
		length: 4
	};

	globalThis.fetch = () =>
		Promise.resolve(
			new Response(JSON.stringify(mockData), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		) as Promise<Response>;

	const request = new Request('http://example.com/api/update?param=1&test=2');
	const result = await updateDailySentence(request);

	assertEquals(result.result, mockData);
});

// 恢复原始 fetch
Deno.test('清理测试环境', () => {
	globalThis.fetch = originalFetch;
});
