// src/11-integration/routes/user/index.ts

import { Type } from '@sinclair/typebox';
import type { FastifyPluginAsync } from 'fastify';
const usersResSchema = Type.Object({ username: Type.String() });

const users: FastifyPluginAsync = async (fastify) => {
	fastify.get(
		'/user',
		{
			onRequest: [fastify.authenticate],
			schema: {
				response: {
					200: usersResSchema
				}
			}
		},
		async (req) => {
			req.log.info('user 路由被访问！');
			return req.user;
		}
	);
};

export default users;
