import cfg from '../../../config.json' with { type: 'json' };
import { PORTS_KEY } from '../../consts.ts';
import DB from '../../db.ts';
import type { PortList, Port } from './port-list-types.ts';

export class PortListDB extends DB<PortList> {
	//  存入localstorage的键
	key = PORTS_KEY;

	// 初始化端口列表
	init() {
		const ports = this.getItems();
		if (!ports) {
			const portsMeta = cfg.portConfig;
			// 简单的类型校验
			if (
				isNaN(portsMeta.end) ||
				isNaN(portsMeta.start) ||
				!Array.isArray(portsMeta.exclude) ||
				portsMeta.exclude.some(isNaN)
			) {
				throw new Error('Invalid port config');
			}
			// 发放端口号，排除excludes的端口
			const portList = Array.from(
				{ length: portsMeta.end - portsMeta.start + 1 },
				(_v, k) => k + portsMeta.start
			).filter((port) => !portsMeta.exclude.includes(port));

			// 初始化可以发放的端口
			this.setItems(portList);
		}
	}
	// 获取一个可用的端口号
	getPort(): Port {
		const ports = this.get();
		if (ports.length === 0) {
			throw new Error('No ports available');
		}
		const port = ports.shift();
		this.set(ports);
		return Number(port);
	}
	// 释放一个端口号
	restorePort(port: Port) {
		const ports = this.get();
		ports.push(port);
		this.set(ports);
	}
}
