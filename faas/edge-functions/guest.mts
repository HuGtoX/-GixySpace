import { Config } from '@netlify/edge-functions';
import Create from './src/guest/create.mts';
import Visit from './src/guest/visit.mts';
import StatsEndpoint from './src/guest/statsEndpoint.mts';
import handlerMaker from './utils/handleMaker.mts';

// 路由映射表
const routes = {
	'/api/guest/create': Create,
	'/api/guest/visit': Visit,
	'/api/guest/stats': StatsEndpoint
};

export default handlerMaker(routes);
export const config: Config = {
	path: '/api/guest/*',
	method: ['POST', 'GET']
};
