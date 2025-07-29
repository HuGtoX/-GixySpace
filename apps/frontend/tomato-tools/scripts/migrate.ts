#!/usr/bin/env tsx

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { createModuleLogger } from '../src/lib/logger';
import * as dotenv from 'dotenv';
import path from 'path';

// 加载环境变量
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const log = createModuleLogger('migration');

async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    log.error('DATABASE_URL environment variable is required');
    process.exit(1);
  }

  log.info('Starting database migration...');

  const migrationClient = postgres(process.env.DATABASE_URL, {
    max: 1,
    prepare: false,
  });

  const db = drizzle(migrationClient);

  try {
    await migrate(db, {
      migrationsFolder: path.join(process.cwd(), 'src/lib/drizzle/migrations'),
    });
    
    log.info('Database migration completed successfully');
  } catch (error) {
    log.error({ error }, 'Database migration failed');
    process.exit(1);
  } finally {
    await migrationClient.end();
  }
}

if (require.main === module) {
  runMigrations().catch((error) => {
    log.error({ error }, 'Migration script failed');
    process.exit(1);
  });
}

export { runMigrations };