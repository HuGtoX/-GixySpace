import { sql } from 'drizzle-orm';
import {
	pgTable,
	unique,
	serial,
	text,
	integer,
	index,
	uuid,
	timestamp,
	foreignKey,
	bigserial,
	jsonb
} from 'drizzle-orm/pg-core';

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

export const guests = pgTable(
	'guests',
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
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

export const guestData = pgTable(
	'guest_data',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey().notNull(),
		guestId: uuid('guest_id'),
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

export const guestUserMapping = pgTable(
	'guest_user_mapping',
	{
		guestId: uuid('guest_id').primaryKey().notNull(),
		userId: uuid('user_id'),
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
			foreignColumns: [table.userId],
			name: 'guest_user_mapping_user_id_fkey'
		}).onDelete('cascade')
	]
);
