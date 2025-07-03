import { Context } from '@netlify/edge-functions';
import { Status } from '../deps/http_status.ts';
import type {
	GeoResponse,
	WeatherResponse,
	AirResponse
} from '../../../packages/types/src/weather.ts';
import { getEnv } from '../utils/getEnv.mts';

const baseUrl = getEnv('HF_BASEURL');
const key = getEnv('QWEATHER_KEY');

console.log('-- [ key ] --', key);
async function getLocationId(
	lat: string,
	lon: string,
	key: string
): Promise<string> {
	const geoUrl = `${baseUrl}/geo/v2/city/lookup?location=${lon},${lat}&key=${key}`;
	const geoRes = await fetch(geoUrl);
	if (!geoRes.ok) {
		throw new Error('地理编码 API 请求失败');
	}
	const geoData: GeoResponse = await geoRes.json();
	if (geoData.code !== '200' || !geoData.location?.[0]) {
		throw new Error('无法获取该坐标的位置信息');
	}
	return geoData.location[0].id;
}
async function weather(request: Request, context: Context) {
	const corsHeaders = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	};

	if (request.method === 'OPTIONS') {
		return new Response(null, {
			status: Status.OK,
			headers: {
				...corsHeaders,
				'Access-Control-Max-Age': '86400'
			}
		});
	}

	try {
		const url = new URL(request.url);
		const lat = Number(url.searchParams.get('lat')).toFixed(2);
		const lon = Number(url.searchParams.get('lon')).toFixed(2);

		if (!lat || !lon) {
			return Response.json(
				{ error: '缺少必要的参数: lat 和 lon' },
				{
					status: Status.BadRequest,
					headers: corsHeaders
				}
			);
		}

		if (!key) {
			throw new Error('未配置和风天气 API 密钥');
		}

		// 先获取 locationId
		const locationId = await getLocationId(lat, lon, key);
		console.log('获取到的 locationId:', locationId);

		const [weatherRes, airRes] = await Promise.all([
			fetch(
				`${baseUrl}/v7/weather/now?location=${locationId}&key=${key}`
			),
			fetch(`${baseUrl}/v7/air/now?location=${locationId}&key=${key}`)
		]);

		if (!weatherRes.ok || !airRes.ok) {
			throw new Error('天气或空气质量 API 请求失败');
		}

		const [weather, air] = await Promise.all([
			weatherRes.json() as Promise<WeatherResponse>,
			airRes.json() as Promise<AirResponse>
		]);

		// 返回完整的地理和天气信息
		return Response.json(
			{
				location: {
					id: locationId,
					latitude: lat,
					longitude: lon,
					city: context.geo?.city || '未知城市',
					country: context.geo?.country?.name || '未知国家'
				},
				weather: weather,
				air: air,
				updateTime: new Date().toISOString()
			},
			{
				headers: {
					...corsHeaders,
					'Cache-Control': 'public, max-age=300',
					'Content-Type': 'application/json'
				}
			}
		);
	} catch (error) {
		console.error('API 请求失败:', error);

		return Response.json(
			{
				error: error instanceof Error ? error.message : '未知错误'
			},
			{
				status: Status.InternalServerError,
				headers: corsHeaders
			}
		);
	}
}

export default weather;
