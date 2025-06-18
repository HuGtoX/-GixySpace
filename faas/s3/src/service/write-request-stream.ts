import { join, storeDir } from './deps.ts';
import { getLatestVersion } from './get-latest-version.ts';
/**
 * 打开给定的文件并以流的形式写入其内容
 * 第一次写入时，会创建文件夹和文件
 */
export async function writeRequestStream(relativePath: string, req: Request) {
  const fileBaseDir = join(storeDir, relativePath);
  const version = await getLatestVersion(relativePath);

  if (version === 0) {
    // 版本为 0，则为第一次写入，创建文件夹
    await Deno.mkdir(fileBaseDir, { recursive: true });
  }
  const newVersion = version + 1;
  // 写入文件的路径
  const filePath = `${fileBaseDir}/${newVersion}`;
  const destFile = await Deno.open(filePath, {
    create: true,
    write: true,
    truncate: true,
  });

  await req.body?.pipeTo(destFile.writable);
  await Deno.writeTextFile(`${fileBaseDir}/meta.json`, JSON.stringify({ version: newVersion }));

  const fileData = await Deno.stat(filePath);

  return {
    size: fileData.size,
    version: newVersion,
  };
}
