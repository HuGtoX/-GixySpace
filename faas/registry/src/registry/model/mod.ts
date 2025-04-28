import { PortListDB } from './port-list.ts';
import { RegistryDictDB } from './registry-dict.ts';

export const portListDB = new PortListDB();
export const registryDictDB = new RegistryDictDB();

// 初始化
function init() {
	portListDB.init();
	registryDictDB.init();
}

init();

// 获取所有状态
export function getAll() {
	return {
		registry: registryDictDB.get(),
		ports: portListDB.get()
	};
}
