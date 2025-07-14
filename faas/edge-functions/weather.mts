import { Config } from '@netlify/edge-functions';
import test from './src/test.ts';
import weather from './src/hefeng/weather.mts';
import handlerMaker from './utils/handleMaker.mts';
import type { RouteHandler } from './utils/handleMaker.mts';
type RouteMap = Record<string, RouteHandler>;
const routes: RouteMap = {
	'/api/hf/test': test,
	'/api/hf/weather': weather
};

export default handlerMaker(routes);
export const config: Config = {
	path: '/api/hf/*'
};
