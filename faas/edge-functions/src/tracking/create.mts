import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eventTrackings } from '../../common/schema.ts';
import { TrackingEvent } from '@gixy/types/tracking.ts';
import { Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
	try {
		const event: TrackingEvent = await request.json();

		console.log('-- [ event ] --', event);

		// 验证必填字段
		if (!event.eventName || !event.guestId) {
			throw new Error('eventName and guestId are required');
		}
		const queryClient = postgres(Netlify.env.get('DATABASE_URL')!);
		const db = drizzle({ client: queryClient });

		// 处理 properties，确保是有效的 JSONB
		const properties =
			typeof event.properties === 'object' ? event.properties : {};

		// 插入事件记录
		const result = await db.insert(eventTrackings).values({
			eventName: event.eventName,
			eventCategory: event.eventCategory,
			guestId: event.guestId,
			properties,
			path: event.path ?? null,
			referrer: event.referrer ?? null,
			userAgent: event.userAgent ?? null,
			ipHash: context.ip ?? null
		});

		return {
			result: result,
			config: {
				status: 200
			}
		};
	} catch (error) {
		console.log('-- [ error ] --', error);
		return {
			result: `Error tracking event: ${error.message}`,
			config: {
				status: 400
			}
		};
	}
};
