import { join, storeDir, readableStreamFromReader } from './deps.ts';
import { getLatestVersion } from './get-latest-version.ts';

/**
 * 打开给定的文件并以流的形式返回其内容，自动选择最新的版本
 * size - 文件的大小，单位是 bytes
 * fileStream - 文件流
 *  /a/b/c.txt/meta.json
 *  /a/b/c.txt/1
 *  /a/b/c.txt/2
 *  /a/b/c.txt/3  ->  /a/b/c.txt
 */
export async function getFileStream(relativePath: string) {
  const version = await getLatestVersion(relativePath);
  if (version === 0) {
    throw new Deno.errors.NotFound(`${relativePath}还没创建`);
  }
  const fileDir = join(storeDir, relativePath);
  const latestFilePath = `${fileDir}/${version}`;
  const fileData = await Deno.stat(latestFilePath);
  if (!fileData.isFile) {
    throw new Deno.errors.BadResource(`${relativePath}不是一个文件`);
  }
  const file = await Deno.open(latestFilePath);
  return {
    size: fileData.size,
    fileStream: readableStreamFromReader(file),
  };
}
