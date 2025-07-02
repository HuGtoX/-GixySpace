async function test(): Promise<Response> {
	return await new Response('Hello world');
}

export default test;
