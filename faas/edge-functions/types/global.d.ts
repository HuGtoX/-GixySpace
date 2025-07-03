declare global {
	interface Global {
		Netlify: {
			env: {
				get: (key: string) => string | undefined;
			};
		};
	}
}

export {};
