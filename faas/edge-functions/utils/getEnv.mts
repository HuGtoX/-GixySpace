import 'dotenv';

// 初始化 Netlify mock
if (!globalThis.Netlify) {
	globalThis.Netlify = {
		// @ts-expect-error - Deno.env.get is not defined in the global scope
		env: {
			get: (key: string) => Deno.env.get(key)
		}
	};
}
export const getEnv = (key: string): string | undefined => {
	return Netlify.env.get(key);
};
