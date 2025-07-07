import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { usersTable } from '../../common/schema.ts';

async function demo(_: Request) {
	const queryClient = postgres(Netlify.env.get('DATABASE_URL')!);
	const db = drizzle({ client: queryClient });
	const users = await db.select().from(usersTable);

	console.log('-- [ users ] --', users);

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
