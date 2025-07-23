import { Config } from '@netlify/edge-functions';
import Create from './src/tracking/create.mts';
import handlerMaker from './utils/handleMaker.mts';

const routes = {
	'/api/tracking/create': Create
};

export default handlerMaker(routes);
export const config: Config = {
	path: '/api/tracking/*',
	method: ['POST', 'GET']
};
