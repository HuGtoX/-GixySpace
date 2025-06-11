import { type FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
	interface FastifyInstance {
		myPlugin1Props: { name: string };
	}
}
const myPlugin1: FastifyPluginAsync = async (fastify, opts) => {
	fastify.decorate('myPlugin1Props', {
		name: 'plugin1'
	});
	console.log('在插件 1 访问 插件 1 装饰的参数', fastify.myPlugin1Props); // { name: 'plugin1' }
};

export default myPlugin1;
