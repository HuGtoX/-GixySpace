// consts.ts
import { dirname, join } from './deps.ts';
const __dirname = dirname(new URL(import.meta.url).pathname).replace(/^\//, '');
export const templateDir = join(__dirname, 'templates');
