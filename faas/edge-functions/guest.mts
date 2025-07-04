import { Config } from '@netlify/edge-functions';
import Create from './src/guest/create.mts';
import handlerMaker from './utils/handleMaker.mts';

// 路由映射表
const routes = {
	'/api/guest/create': Create
};

export default handlerMaker(routes);
export const config: Config = {
	path: '/api/guest/*'
};
