import buildServer from './server';

const server = await buildServer();
const start = async () => {
	try {
		await server.listen({ port: 3000 });
		server.log.info('Server is running on port 3000');
	} catch (error) {
		server.log.error(error);
		process.exit(1);
	}
};

start();
