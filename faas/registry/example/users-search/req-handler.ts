import { join, Status } from './deps.ts';

const dirPath = new URL('.', import.meta.url).pathname;
const dbPath = join(dirPath, 'db.json');
console.log(dbPath);

export function handlerMaker(method: string, pathPattern: string) {
  return async function reqHandler(req: Request) {
    if (
      !req.headers.has('Authorization') ||
      req.headers.get('Authorization')?.split(' ')[1] !== Deno.env.get('AUTH_TOKEN')
    ) {
      // 进行鉴权，密钥在环境变量中
      return new Response(null, { status: Status.Unauthorized });
    }
    if (req.method !== method) {
      // 仅处理 POST 请求
      return new Response(null, { status: Status.MethodNotAllowed });
    }
    const { pathname: path, searchParams: query } = new URL(req.url);
    if (path !== pathPattern) {
      // 仅允许 /users/search 路径
      return new Response(null, { status: Status.NotFound });
    }

    const userId = query.get('userId');
    if (!userId) {
      // 必须有 userId 参数
      return new Response(null, { status: Status.BadRequest });
    }
    const userObj = JSON.parse(await Deno.readTextFile(dbPath))[userId];
    if (!userObj) {
      // 未找到用户
      return new Response(null, { status: Status.NoContent });
    }

    return new Response(JSON.stringify(userObj), {
      headers: {
        'content-type': 'application/json',
      },
    });
  };
}
