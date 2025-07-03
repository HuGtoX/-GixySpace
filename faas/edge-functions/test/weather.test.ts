import { assertEquals } from 'jsr:@std/assert';
import weather from '../src/weather.mts';
import 'https://esm.sh/jsr/@std/dotenv/load';

Deno.test('weather API - 正常请求', async () => {
	const request = new Request(
		'http://example.com/weather?lat=39.90&lon=116.40'
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

Deno.test('weather API - CORS预检请求', async () => {
	const request = new Request('http://example.com/weather', {
		method: 'OPTIONS'
	});
	const context = {};
	const response = await weather(request, context);
	assertEquals(response.status, 200);
	assertEquals(response.headers.get('Access-Control-Allow-Origin'), '*');
	assertEquals(response.headers.get('Access-Control-Max-Age'), '86400');
});
