import pkg from '../package.json' with { type: 'json' };

const startTime = Date.now();

export function version() {
	// 返回版本信息、启动时间、Deno版本、内存使用情况
	return {
		version: pkg.version,
		uptime: (Date.now() - startTime) / 1000,
		...Deno.version,
		...Deno.memoryUsage()
	};
}
