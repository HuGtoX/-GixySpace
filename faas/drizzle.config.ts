import { defineConfig } from 'drizzle-kit';
// 加载.env文件
import 'dotenv/config';

export default defineConfig({
	dialect: 'postgresql',
	schema: './common/schema.ts',
	out: './drizzle',
	dbCredentials: {
		url: process.env.DATABASE_URL
	}
});
