import { Context } from '@netlify/edge-functions';
import { RequestResult } from '../utils/handleMaker.mts';
function test(_: Request, context: Context): RequestResult {
	return {
		result: JSON.stringify(context)
	};
}

export default test;
