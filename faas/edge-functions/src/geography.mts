import { corsHeaders } from '../utils/index.mts';
import type { GeoResponse } from '../../../packages/types/src/weather.ts';

const baseUrl = Netlify.env.get('HF_BASEURL');
const key = Netlify.env.get('QWEATHER_KEY');

async function geography(_: Request): Promise<Response> {
	const geoUrl = `${baseUrl}/geo/v2/city/lookup?location=&key=${key}`;
	const geoRes = await fetch(geoUrl);
	if (!geoRes.ok) {
		throw new Error('地理编码 API 请求失败');
	}
	const geoData: GeoResponse = await geoRes.json();
	if (geoData.code !== '200' || !geoData.location?.[0]) {
		throw new Error('无法获取该坐标的位置信息');
	}

	return Response.json(
		{
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
}

export default geography;
