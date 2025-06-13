// src/registry/service/get-all.ts
import { registryDictDB } from '../model/mod.ts';
export function getAll() {
  const registryDict = registryDictDB.get();
  // 把 pathDict 转换成 [{ path, filePath, port }] 的形式
  return Object.values(registryDict).map(({ filePath, path, port, targetUrl }) => ({
    path,
    filePath,
    port,
    targetUrl,
  }));
}
