import { Config } from '@netlify/edge-functions';
import getDailySentence from './src/yiyan/get.mts';
import handlerMaker from './utils/handleMaker.mts';

const routes = {
	'/api/yiyan/get': getDailySentence
};

export default handlerMaker(routes);
export const config: Config = {
	cache: 'manual',
	path: '/api/yiyan/*',
	method: ['GET']
};
