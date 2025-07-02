declare global {
	interface NetlifyEnv {
		get(key: string): string | undefined;
	}

	const Netlify: {
		env: NetlifyEnv;
	};
}

export {};
