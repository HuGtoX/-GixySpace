// api/guest/create.ts
import { createClient } from 'supabase';

export default async (req: Request) => {
	const { guest_id, fingerprint } = await req.json();

	// 匿名化处理IP地址
	const ip = req.headers.get('x-forwarded-for') || 'unknown';
	const ipHash = await crypto.subtle
		.digest('SHA-256', new TextEncoder().encode(ip))
		.then((hash) =>
			Array.from(new Uint8Array(hash))
				.map((b) => b.toString(16).padStart(2, '0'))
				.join('')
		);

	const supabase = createClient(
		Deno.env.get('SUPABASE_URL')!,
		Deno.env.get('SUPABASE_SERVICE_KEY')!
	);

	// 创建访客记录
	const { error } = await supabase.from('guests').upsert(
		{
			id: guest_id,
			fingerprint,
			ip_hash: ipHash,
			user_agent: req.headers.get('user-agent')
		},
		{ onConflict: 'id' }
	);

	if (error) return new Response(JSON.stringify(error), { status: 500 });

	return new Response(JSON.stringify({ success: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
