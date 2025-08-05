import { Config } from '@netlify/edge-functions';
import searchIcon from './src/htmlIcon/search.mjs';
import handlerMaker from './utils/handleMaker.mjs';

const routes = {
	'/api/icon/get': searchIcon
};

export default handlerMaker(routes);
export const config: Config = {
	path: '/api/icon/*',
	method: ['GET']
};
