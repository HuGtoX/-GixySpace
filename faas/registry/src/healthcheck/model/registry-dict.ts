import DB from '../../db.ts';
import { REGISTRY_DB_KEY } from '../../consts.ts';
import type {
	RegistryDict,
	PathCache,
	Registry
} from './registry-list-types.ts';
import { intersect } from '../../../deps.ts';

export class RegistryDictDB extends DB<RegistryDict> {
	// 存储pathCache，对一个具体的path请求时可以快速获得路径
	private pathCache: PathCache = {};
	// 在获取registry时不需要每次都访问localstorage，可以直接从缓存获取，提高效率
	private RegistryCache: RegistryDict = {};
	key = REGISTRY_DB_KEY;

	public init() {
		const registryDictLocalStorage = this.getItems();
		console.log('-- [ registryDictLocalStorage ] --', registryDictLocalStorage);

		if (!registryDictLocalStorage) {
			console.log('-- [ registryDictLocalStorage 不存在，开始初始化...] --');
			this.setItems({});
		}
		const registryDict = super.get();
		this.setAndRefreshCache(registryDict);
	}

	private setAndRefreshCache(data: RegistryDict): void {
		// 刷新cache
		this.RegistryCache = data;
		// 刷新pathCache
		Object.values(this.RegistryCache).forEach((registry) => {
			registry.path.forEach((path) => {
				this.pathCache[path] = registry;
			});
		});
		this.set(data);
	}
	public deleteFilePath(filePath: string) {
		const registryDict = this.get();
		const port = registryDict[filePath]?.port;
		delete registryDict[filePath];
		this.setAndRefreshCache(registryDict);
		return port;
	}

	public getTargetUrl(path: string): string | undefined {
		return this.pathCache[path]?.targetUrl;
	}

	public ifFilePathExist(filePath: string): boolean {
		const registryDict = this.get();
		return Object.keys(registryDict).includes(filePath);
	}

	override get(): RegistryDict {
		return this.RegistryCache;
	}

	private checkUniquePath(filePath: string, path: string[]) {
		const registryDict = this.get();
		Object.keys(registryDict)
			.filter((x) => x !== filePath)
			.forEach((key) => {
				// 一个地址的path不能和其他地址的path有交集
				const intersectPath = intersect(registryDict[key].path, path);
				if (intersectPath.length) {
					throw new Deno.errors.AlreadyExists(
						`路径${intersectPath.join(',')}已经被注册`
					);
				}
			});
	}
}
