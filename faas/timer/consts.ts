import { dirname, join } from './deps.ts';
const __dirname = dirname(new URL(import.meta.url).pathname);
export const baseStoreDir = join(__dirname, 'store');
export const logDir = join(__dirname, 'log');
export const timerStoreDir = 'timer';
