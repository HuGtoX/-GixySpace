import { type FastifyPluginAsync } from 'fastify';
import { Type } from '@sinclair/typebox';
const usersReqSchema = Type.Array(Type.Object({ username: Type.String() }));

const users: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    '/users',
    {
      schema: {
        response: {
          200: usersReqSchema,
        },
      },
    },
    async (req) => {
      req.log.info('users 路由被访问！');

     // 在生产时，数据是从数据库，或者复杂业务变换中返回的，
     // 如果返回的不符合 json schema 的，则不会把错误的数据返回给前端
      // return [{ wrong: '紫霞' }, { wrong: '至尊宝' }];
     // 正确返回
     return [{ username: '紫霞' }, { username: '至尊宝' }];
    },
  );
};

export default users;
