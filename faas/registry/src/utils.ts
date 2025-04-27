import { brightRed } from '../deps.ts';
export function printError(msg: string) {
	console.log(`${brightRed('错误：')}${msg}`);
}
