import { registryDictDB, portListDB } from '../model/mod.ts';

export function deleteApi(filePath: string) {
  if (!registryDictDB.ifFilePathExist(filePath)) {
    throw new Deno.errors.NotFound(`路径 ${filePath} 没有被注册`);
  }
  const releasePort = registryDictDB.deleteFilePath(filePath);
  portListDB.restorePort(releasePort);
}
