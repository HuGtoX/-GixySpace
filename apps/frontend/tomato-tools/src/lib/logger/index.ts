import pino, { Logger } from 'pino';

// 创建日志实例
export const logger: Logger =
  process.env.NODE_ENV === 'production'
    ? // 生产环境使用JSON格式
      pino({ 
        level: process.env.PINO_LOG_LEVEL || 'warn',
        timestamp: pino.stdTimeFunctions.isoTime,
      })
    : // 开发环境使用美化输出
      pino({
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
        level: process.env.PINO_LOG_LEVEL || 'debug',
        timestamp: pino.stdTimeFunctions.isoTime,
      });

// 创建模块特定的日志器
export const createModuleLogger = (module: string) => {
  return logger.child({ module });
};

// 创建带有请求ID的日志器
export const createRequestLogger = (requestId: string, module?: string) => {
  const baseFields = { requestId };
  if (module) {
    Object.assign(baseFields, { module });
  }
  return logger.child(baseFields);
};

// 获取关联ID（从请求头中）
export const getCorrelationId = (headers: Headers): string | null => {
  return headers.get('x-correlation-id') || headers.get('x-request-id') || null;
};

// 生成新的关联ID
export const generateCorrelationId = (): string => {
  return crypto.randomUUID();
};

export default logger;