import { Config } from '@netlify/edge-functions';
import test from './src/test.ts';
import weather from './src/weather.mts';
import handlerMaker from './utils/handleMaker.mts';

// 路由映射表
const routes = {
	'/api/hf/test': test,
	'/api/hf/weather': weather
};

export default handlerMaker(routes);
export const config: Config = {
	path: '/api/hf/*'
};
