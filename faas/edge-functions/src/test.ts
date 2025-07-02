import { Context } from '@netlify/edge-functions';

async function test(_: Request, context: Context): Promise<Response> {
	return await new Response(JSON.stringify(context));
}

export default test;
