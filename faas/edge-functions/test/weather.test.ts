import { assertEquals } from 'std/assert';
import weather from '../weather.mts';

Deno.test('weather API - 正常请求', async () => {
	const request = new Request(
		'http://example.com/api/hf/weather?lat=39.90&lon=116.40'
	);
	const context = {
		geo: {
			city: '北京',
			country: { name: '中国' }
		}
	};

	const response = await weather(request, context);
	const data = await response.json();

	assertEquals(response.status, 200);
	assertEquals(data.weather.code, '200');
	assertEquals(data.air.code, '200');
});
