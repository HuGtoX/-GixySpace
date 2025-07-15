import { sql } from 'drizzle-orm';
import {
	pgTable,
	unique,
	serial,
	text,
	integer,
	index,
	timestamp,
	foreignKey,
	bigserial,
	primaryKey,
	date,
	boolean,
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

export const eventTrackings = pgTable(
	'event_trackings',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey().notNull(),
		// 事件名称，如 'page_view', 'button_click' 等
		eventName: text('event_name').notNull(),
		// 事件类别，如 'user_action', 'system_event' 等
		eventCategory: text('event_category'),
		// 访客ID，关联到guests表
		guestId: text('guest_id').notNull(),
		// 事件属性，可以存储任意JSON数据
		properties: jsonb('properties').default('{}'),
		// 事件发生时间
		occurredAt: timestamp('occurred_at', {
			withTimezone: true,
			mode: 'string'
		}).defaultNow(),
		// 用户当前页面路径
		path: text('path'),
		// 来源页面
		referrer: text('referrer'),
		// 设备信息
		userAgent: text('user_agent'),
		// IP 地址哈希
		ipHash: text('ip_hash')
	},
	(table) => [
		// 按时间降序索引，用于查询最近的事件
		index('idx_event_trackings_occurred_at').using(
			'btree',
			table.occurredAt.desc().nullsLast().op('timestamptz_ops')
		),
		// 联合索引，用于按访客和事件类型查询
		index('idx_event_trackings_guest_event').using(
			'btree',
			table.guestId.asc().nullsLast().op('text_ops'),
			table.eventName.asc().nullsLast().op('text_ops')
		),
		// 外键约束
		foreignKey({
			columns: [table.guestId],
			foreignColumns: [guests.id],
			name: 'event_trackings_guest_id_fkey'
		}).onDelete('cascade')
	]
);

export const guests = pgTable(
	'guests',
	{
		id: text('id').primaryKey().notNull(),
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
		// 添加复合主键约束，确保映射关系唯一
		primaryKey({ columns: [table.guestId, table.userId] }),

		foreignKey({
			columns: [table.guestId],
			foreignColumns: [guests.id],
			name: 'guest_user_mapping_guest_id_fkey'
		}),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [usersTable.id],
			name: 'guest_user_mapping_user_id_fkey'
		}).onDelete('cascade')
	]
);

// 待办事项表
export const todos = pgTable(
	'todos',
	{
		id: serial('id').primaryKey(),
		text: text('text').notNull(),
		completed: boolean('completed').default(false).notNull(),
		archived: boolean('archived').default(false).notNull(),
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
		guestId: text('guest_id').references(() => guests.id, {
			onDelete: 'cascade'
		})
	},
	(table) => [
		index('idx_todos_guest_id').on(table.guestId),
		index('idx_todos_archived').on(table.archived)
	]
);

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;

export const dailySentences = pgTable(
	'daily_sentences',
	{
		id: serial('id').primaryKey(),
		content: text('content').notNull(),
		from: text('from'),
		fetchData: text('fetch_data'),
		fetchDate: date('fetch_date')
			.notNull()
			.default(sql`CURRENT_DATE`),
		createdAt: timestamp('created_at').notNull().defaultNow()
	},
	(table) => [
		// 确保每天只有一条记录
		index('idx_daily_sentences_date').on(table.fetchDate)
	]
);
