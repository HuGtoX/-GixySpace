import * as Registry from '../../registry/model/mod.ts';

export function getAll() {
	return {
		registry: Registry.getAll()
	};
}
