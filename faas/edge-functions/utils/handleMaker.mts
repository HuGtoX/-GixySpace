import { Context } from '@netlify/edge-functions';

export type RouteHandler = (
	request: Request,
	context: Context
) => Promise<Response>;

// 路由映射表
function handlerMaker(routes: Record<string, RouteHandler>) {
	return async function handler(
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
			return await routeHandler(request, context);
		} catch (error) {
			console.error('Error processing request:', error);
			return new Response('Internal Server Error', { status: 500 });
		}
	};
}

export default handlerMaker;
