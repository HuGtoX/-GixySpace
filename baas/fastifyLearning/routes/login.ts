import errors from 'http-errors';
import { type FastifyPluginAsync, type FastifyRequest } from 'fastify';
import { type Static, Type } from '@sinclair/typebox';
const loginSchema = Type.Object({
	username: Type.String(),
	password: Type.String()
});

type LoginSchema = Static<typeof loginSchema>;

const login: FastifyPluginAsync = async (fastify) => {
	fastify.post(
		'/login',
		{ schema: { body: loginSchema } },
		async (req: FastifyRequest<{ Body: LoginSchema }>) => {
			const { username, password } = req.body;
			if (username !== password) {
				throw new errors.Unauthorized();
			}
			return { token: fastify.jwt.sign({ username }) };
		}
	);
};

export default login;
