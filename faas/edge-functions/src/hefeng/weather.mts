import { Context } from '@netlify/edge-functions';
import type {
	GeoResponse,
	WeatherResponse,
	AirResponse
} from '@gixy/types/weather.ts';
import { getEnv } from '../../utils/getEnv.mts';

const baseUrl = getEnv('HF_BASEURL');
const key = getEnv('QWEATHER_KEY');

async function getLocationId(
	lat: string,
	lon: string,
	key: string
): Promise<string> {
	const geoRes = await fetch(
		`${baseUrl}/geo/v2/city/lookup?location=${lon},${lat}&key=${key}`
	);
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
	const url = new URL(request.url);
	const lat = Number(url.searchParams.get('lat')).toFixed(2);
	const lon = Number(url.searchParams.get('lon')).toFixed(2);

	if (!lat || !lon) {
		throw new Error('缺少必要的参数: lat 和 lon');
	}
	if (!key) {
		throw new Error('未配置和风天气 API 密钥');
	}

	// 先获取 locationId
	const locationId = await getLocationId(lat, lon, key);

	const [weatherRes, airRes] = await Promise.all([
		fetch(`${baseUrl}/v7/weather/now?location=${locationId}&key=${key}`),
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
	return {
		result: {
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
		}
	};
}

export default weather;
