import { createClient } from 'supabase';
import { getEnv } from '../utils/getEnv.mts';
// import 'dotenv';

async function demo(_: Request) {
	const supabase = createClient(
		getEnv('SUPABASE_DATABASE_URL')!,
		getEnv('SUPABASE_ANON_KEY')!
	);

	console.log('-- [ createClient ] --', createClient);

	// // 创建访客记录
	const data = await supabase.from('guests').select();
	console.log('-- [ data ] --', data);

	return Response.json(
		{
			success: true,
			data: []
		},
		{
			headers: {
				'Cache-Control': 'public, max-age=300',
				'Content-Type': 'application/json'
			}
		}
	);
}

export default demo;
