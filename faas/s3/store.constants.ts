// faas/s3/store.constants.ts
import { dirname, join } from './deps.ts';

// 当前模块的目录
const __dirname = dirname(new URL(import.meta.url).pathname).replace(/^\//, '');
console.log('-- [ __dirname ] --', __dirname);
// 文件的存储目录
export const storeDir = join(__dirname, 'store');
// 日志的存储目录
export const logDir = join(__dirname, 'log');
