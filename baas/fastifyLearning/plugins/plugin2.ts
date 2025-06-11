// src/03-scope/plugin2.ts
import { type FastifyPluginAsync } from 'fastify';

const myPlugin2: FastifyPluginAsync = async (fastify, _opt) => {
	// 主应用使用装饰器挂载，所有的子环境都可以访问
	// 插件 1 装饰器装饰的参数因为封装的作用域规则，插件 2 是无法访问的。
	// 插件 3 因为此时还没有进行注册，所以插件 2 无法访问插件 3 的装饰参数。
};
export default myPlugin2;
