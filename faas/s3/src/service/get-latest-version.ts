import { join, storeDir } from './deps.ts';
import { FileMeta } from './types.ts';

/*
 *  有两种情况，情况1，文件夹不存在，情况2，文件夹存在，以 meta.json 为准来判断文件已存在
 *  /a/b/c.txt/meta.json
 *  /a/b/c.txt/1
 *  /a/b/c.txt/2
 *  /a/b/c.txt/3  ->  /a/b/c.txt
 */
export async function getLatestVersion(relativePath: string): Promise<number> {
  const fileDir = join(storeDir, relativePath);
  const fileMetaPath = `${fileDir}/meta.json`;
  try {
    // meta.json 存在
    await Deno.stat(fileMetaPath);
    const meta: FileMeta = JSON.parse(await Deno.readTextFile(`${fileDir}/meta.json`));
    return meta.version;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      // meta.json 不存在
      return 0;
    }
    // 其他错误
    throw e;
  }
}
