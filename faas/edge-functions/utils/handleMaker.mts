import { Context } from '@netlify/edge-functions';

export type RequestResult<T = unknown> = {
	result: T;
	config?: ResponseInit;
};
export type RouteHandler = (
	request: Request,
	context: Context
) => RequestResult | Promise<RequestResult>;

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

			const { result, config = {} } = await routeHandler(
				request,
				context
			);

			const { headers, ...others } = config;

			return Response.json(result, {
				headers: {
					...headers
				},
				...others
			});
		} catch (error) {
			console.error('Error processing request:', error);
			return Response.json(
				{
					error: error instanceof Error ? error.message : '未知错误'
				},
				{
					status: 500
				}
			);
		}
	};
}

export default handlerMaker;
