import { registryDictDB, portListDB } from '../model/mod.ts';
interface RegisterOptions {
  // 注册的路径，每个路径只能注册一次
  path: string[];
  filePath: string;
}

export function register({ path, filePath }: RegisterOptions) {
  const registryDict = registryDictDB.get();
  const res = registryDict[filePath];
  if (res) {
    // 已存在，已经注册了
    registryDictDB.refreshPath(filePath, path);
    // 如果文件路径相同，直接返回端口号
    return res.port;
  }
  // 获取一个端口号
  const port = portListDB.getPort();
  const targetUrl = `http://localhost:${port}`;
  registryDictDB.setRegistry({
    filePath,
    path,
    port,
    targetUrl,
  });

  return port;
}
