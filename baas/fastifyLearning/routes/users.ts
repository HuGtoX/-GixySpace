import { FastifyPluginAsync } from 'fastify';
const users: FastifyPluginAsync = async (fastify) => {
	fastify.get('/users', async (req) => {
		req.log.info('users 路由被访问！');
		return [{ username: '紫霞' }, { username: '至尊宝' }];
	});
};

export default users;
