import { version } from '../../version.ts';

export function healthStatus() {
	return {
		status: '在线',
		...version()
	};
}
