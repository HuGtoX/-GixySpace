import { assertEquals } from 'std/assert';
import getDailySentence from '../src/yiyan/get.mts';

// 使用 Deno 内置测试
Deno.test('getDailySentence 测试', async () => {
	// 创建一个模拟请求对象
	const request = new Request('http://localhost:8888');

	try {
		// 调用函数
		const result = await getDailySentence(request);

		// 验证结果
		assertEquals(typeof result, 'object');
		assertEquals('result' in result, true);
		assertEquals(typeof result.result, 'object');
		assertEquals('hitokoto' in result.result, true);

		console.log('测试通过！每日一言内容:', result.result.hitokoto);
	} catch (error) {
		console.error('测试失败:', error);
		throw error;
	} finally {
		// 清理全局变量
		delete globalThis.Netlify;
	}
});
