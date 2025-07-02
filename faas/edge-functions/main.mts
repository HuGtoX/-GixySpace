import { Config, Context } from '@netlify/edge-functions';
import test from './src/test.ts';
import weather from './src/weather.mts';
export const config: Config = {
	path: '/api/*'
};

// 定义路由处理器类型
export type RouteHandler = (
	request: Request,
	context: Context
) => Promise<Response>;

// 路由映射表
const routes: Record<string, RouteHandler> = {
	'/api/test': test,
	'/api/weather': weather
};

// 主要处理函数
export default async function handler(
	request: Request,
	context: Context
): Promise<Response> {
	try {
		const url = new URL(request.url);
		const path = url.pathname;

		// 查找对应的路由处理器
		const routeHandler = routes[path];

		if (!routeHandler) {
			return new Response('Not Found', { status: 404 });
		}

		// 执行对应的路由处理器
		return await routeHandler(request, context);
	} catch (error) {
		console.error('Error processing request:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
}
