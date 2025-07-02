import 'dot-env';

export const getEnv = (key: string, defaultValue?: string): string => {
	return Deno.env.get(key) || defaultValue || '';
};
