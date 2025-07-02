import 'https://esm.sh/jsr/@std/dotenv/load';

export const getEnv = (key: string, defaultValue?: string): string => {
	return Deno.env.get(key) || defaultValue || '';
};
