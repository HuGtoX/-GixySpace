import { route } from './src/router.ts';
import { log } from './src/utils/logger.ts';
import { serve, withCors } from './deps.ts';
import { storeDir } from './store.constants.ts';

// 检查是否有读写权限

async function checkAccess() {
  if ((await Deno.permissions.query({ name: 'read', path: storeDir })).state !== 'granted') {
    console.error('错误: 没有读权限', storeDir);
    Deno.exit(1);
  }
  if ((await Deno.permissions.query({ name: 'write', path: storeDir })).state !== 'granted') {
    console.error('错误: 没有写权限', storeDir);
    Deno.exit(1);
  }
}

await checkAccess();
log.critical('s3 服务器已启动...');
serve(withCors(route), { port: 18080 });
