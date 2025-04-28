import type { Port } from './port-list-types.ts';
// 路径的类型定义
export type Path = string;
// 路径列表的类型定义
export type PathList = Path[];
// 文件路径的类型定义
export type FilePath = string;
export interface Registry {
	// 文件路径
	filePath: FilePath;
	// 端口号，每个文件路径只能注册一个端口号
	port: Port;
	// 注册的目标地址
	targetUrl: string;
	// 注册在该路径下的所有子路径
	path: PathList;
}

// 路径缓存的类型定义
export type PathCache = Record<Path, Registry>;
// 注册表的类型定义
export type RegistryDict = Record<FilePath, Registry>;
