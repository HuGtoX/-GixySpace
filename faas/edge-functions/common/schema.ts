import {
	pgTable,
	index,
	serial,
	text,
	date,
	timestamp,
	unique,
	integer,
	foreignKey,
	bigserial,
	jsonb,
	boolean,
	uuid,
	primaryKey,
	pgEnum
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const userRole = pgEnum('user_role', ['user', 'admin']);

export const dailySentences = pgTable(
	'daily_sentences',
	{
		id: serial().primaryKey().notNull(),
		content: text().notNull(),
		source: text(),
		fetchData: text('fetch_data'),
		fetchDate: date('fetch_date')
			.default(sql`CURRENT_DATE`)
			.notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [index('idx_daily_sentences_date').on(table.fetchDate)]
);

export const usersTable = pgTable(
	'users_table',
	{
		id: serial().primaryKey().notNull(),
		name: text().notNull(),
		age: integer().notNull(),
		email: text().notNull()
	},
	(table) => [unique('users_table_email_unique').on(table.email)]
);

export const guestData = pgTable(
	'guest_data',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey().notNull(),
		guestId: text('guest_id').notNull(),
		key: text().notNull(),
		value: jsonb().notNull(),
		expiresAt: timestamp('expires_at', {
			withTimezone: true,
			mode: 'string'
		}).default(sql`(now() + '30 days'::interval)`)
	},
	(table) => [
		index('idx_guest_data_key').using(
			'btree',
			table.guestId.asc().nullsLast().op('text_ops'),
			table.key.asc().nullsLast().op('text_ops')
		),
		foreignKey({
			columns: [table.guestId],
			foreignColumns: [guests.id],
			name: 'guest_data_guest_id_fkey'
		}).onDelete('cascade')
	]
);

export const guests = pgTable(
	'guests',
	{
		id: text().primaryKey().notNull(),
		createdAt: timestamp('created_at', {
			withTimezone: true,
			mode: 'string'
		}).defaultNow(),
		lastSeen: timestamp('last_seen', {
			withTimezone: true,
			mode: 'string'
		}).defaultNow(),
		userAgent: text('user_agent'),
		ipHash: text('ip_hash'),
		fingerprint: text(),
		avatarUrl: text('avatar_url').default('/avatar/a1.svg')
	},
	(table) => [
		index('idx_guests_fingerprint').using(
			'btree',
			table.fingerprint.asc().nullsLast().op('text_ops')
		),
		index('idx_guests_last_seen').using(
			'btree',
			table.lastSeen.asc().nullsLast().op('timestamptz_ops')
		)
	]
);

export const todos = pgTable(
	'todos',
	{
		id: serial().primaryKey().notNull(),
		text: text().notNull(),
		completed: boolean().default(false).notNull(),
		archived: boolean().default(false).notNull(),
		createdAt: timestamp('created_at', {
			withTimezone: true,
			mode: 'string'
		})
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updated_at', {
			withTimezone: true,
			mode: 'string'
		})
			.defaultNow()
			.notNull(),
		guestId: text('guest_id')
	},
	(table) => [
		index('idx_todos_archived').using(
			'btree',
			table.archived.asc().nullsLast().op('bool_ops')
		),
		index('idx_todos_guest_id').using(
			'btree',
			table.guestId.asc().nullsLast().op('text_ops')
		),
		foreignKey({
			columns: [table.guestId],
			foreignColumns: [guests.id],
			name: 'todos_guest_id_guests_id_fk'
		}).onDelete('cascade')
	]
);

export const passwordResetToken = pgTable(
	'password_reset_token',
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		userId: uuid('user_id').notNull(),
		token: text().notNull(),
		expiresAt: timestamp('expires_at', {
			withTimezone: true,
			mode: 'string'
		}).notNull(),
		usedAt: timestamp('used_at', { withTimezone: true, mode: 'string' }),
		createdAt: timestamp('created_at', {
			withTimezone: true,
			mode: 'string'
		})
			.defaultNow()
			.notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: 'password_reset_token_user_id_user_id_fk'
		}).onDelete('cascade'),
		unique('password_reset_token_token_unique').on(table.token)
	]
);

export const user = pgTable(
	'user',
	{
		id: uuid().primaryKey().notNull(),
		email: text().notNull(),
		fullName: text('full_name'),
		avatarUrl: text('avatar_url'),
		role: userRole().default('user').notNull(),
		isActive: boolean('is_active').default(true).notNull(),
		createdAt: timestamp('created_at', {
			withTimezone: true,
			mode: 'string'
		})
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updated_at', {
			withTimezone: true,
			mode: 'string'
		})
			.defaultNow()
			.notNull()
	},
	(table) => [unique('user_email_unique').on(table.email)]
);

export const userProfile = pgTable(
	'user_profile',
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		userId: uuid('user_id').notNull(),
		bio: text(),
		website: text(),
		location: text(),
		preferences: text(),
		createdAt: timestamp('created_at', {
			withTimezone: true,
			mode: 'string'
		})
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updated_at', {
			withTimezone: true,
			mode: 'string'
		})
			.defaultNow()
			.notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: 'user_profile_user_id_user_id_fk'
		}).onDelete('cascade')
	]
);

export const userSession = pgTable(
	'user_session',
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		userId: uuid('user_id').notNull(),
		sessionId: text('session_id').notNull(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		loginAt: timestamp('login_at', { withTimezone: true, mode: 'string' })
			.defaultNow()
			.notNull(),
		logoutAt: timestamp('logout_at', {
			withTimezone: true,
			mode: 'string'
		}),
		isActive: boolean('is_active').default(true).notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: 'user_session_user_id_user_id_fk'
		}).onDelete('cascade')
	]
);

export const eventTrackings = pgTable(
	'event_trackings',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey().notNull(),
		eventName: text('event_name').notNull(),
		eventCategory: text('event_category'),
		guestId: text('guest_id').notNull(),
		properties: jsonb().default({}),
		occurredAt: timestamp('occurred_at', {
			withTimezone: true,
			mode: 'string'
		}).defaultNow(),
		path: text(),
		referrer: text(),
		userAgent: text('user_agent'),
		ipHash: text('ip_hash')
	},
	(table) => [
		index('idx_event_trackings_guest_event').using(
			'btree',
			table.guestId.asc().nullsLast().op('text_ops'),
			table.eventName.asc().nullsLast().op('text_ops')
		),
		index('idx_event_trackings_occurred_at').using(
			'btree',
			table.occurredAt.asc().nullsLast().op('timestamptz_ops')
		),
		foreignKey({
			columns: [table.guestId],
			foreignColumns: [guests.id],
			name: 'event_trackings_guest_id_fkey'
		}).onDelete('cascade')
	]
);

export const guestUserMapping = pgTable(
	'guest_user_mapping',
	{
		guestId: text('guest_id').notNull(),
		userId: integer('user_id').notNull(),
		migratedAt: timestamp('migrated_at', {
			withTimezone: true,
			mode: 'string'
		}).defaultNow()
	},
	(table) => [
		foreignKey({
			columns: [table.guestId],
			foreignColumns: [guests.id],
			name: 'guest_user_mapping_guest_id_fkey'
		}),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [usersTable.id],
			name: 'guest_user_mapping_user_id_fkey'
		}).onDelete('cascade'),
		primaryKey({
			columns: [table.guestId, table.userId],
			name: 'guest_user_mapping_guest_id_user_id_pk'
		})
	]
);
