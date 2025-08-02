/**
 * 日志库使用示例
 * 运行此文件可以查看不同级别日志的彩色输出效果
 */

import { logger, createModuleLogger, createRequestLogger, generateCorrelationId } from '@/lib/logger';

// 基础日志示例
function basicLoggingDemo() {
  console.log('\n=== 基础日志示例 ===');
  
  logger.trace('这是 trace 级别的日志 - 最详细的调试信息');
  logger.debug('这是 debug 级别的日志 - 调试信息');
  logger.info('这是 info 级别的日志 - 一般信息');
  logger.warn('这是 warn 级别的日志 - 警告信息');
  logger.error('这是 error 级别的日志 - 错误信息');
  logger.fatal('这是 fatal 级别的日志 - 致命错误');
}

// 结构化日志示例
function structuredLoggingDemo() {
  console.log('\n=== 结构化日志示例 ===');
  
  logger.info({
    userId: '12345',
    action: 'login',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0...'
  }, '用户登录成功');
  
  logger.error({
    error: 'Database connection failed',
    code: 'ECONNREFUSED',
    host: 'localhost',
    port: 5432
  }, '数据库连接失败');
  
  logger.warn({
    memoryUsage: '85%',
    threshold: '80%',
    action: 'cleanup_triggered'
  }, '内存使用率过高，触发清理');
}

// 模块日志示例
function moduleLoggingDemo() {
  console.log('\n=== 模块日志示例 ===');
  
  const authLogger = createModuleLogger('auth');
  const userLogger = createModuleLogger('user');
  const apiLogger = createModuleLogger('api');
  
  authLogger.info('用户认证开始');
  authLogger.debug({ token: 'jwt_token_hash' }, '验证 JWT token');
  authLogger.info('用户认证成功');
  
  userLogger.info({ userId: '67890' }, '开始更新用户信息');
  userLogger.warn({ field: 'email', reason: 'invalid_format' }, '用户邮箱格式无效');
  userLogger.error({ userId: '67890', error: 'validation_failed' }, '用户信息更新失败');
  
  apiLogger.info({ endpoint: '/api/users', method: 'GET' }, 'API 请求开始');
  apiLogger.info({ endpoint: '/api/users', method: 'GET', duration: 150, status: 200 }, 'API 请求完成');
}

// 请求级别日志示例
function requestLoggingDemo() {
  console.log('\n=== 请求级别日志示例 ===');
  
  const correlationId = generateCorrelationId();
  const requestLogger = createRequestLogger(correlationId, 'api/orders');
  
  requestLogger.info('开始处理订单创建请求');
  requestLogger.debug({ payload: { productId: 'prod_123', quantity: 2 } }, '验证请求参数');
  requestLogger.info({ orderId: 'order_456', amount: 99.99 }, '订单创建成功');
  
  // 模拟另一个相关的请求
  const paymentLogger = createRequestLogger(correlationId, 'payment');
  paymentLogger.info({ orderId: 'order_456', method: 'credit_card' }, '开始处理支付');
  paymentLogger.error({ orderId: 'order_456', error: 'insufficient_funds' }, '支付失败');
}

// 性能监控示例
function performanceLoggingDemo() {
  console.log('\n=== 性能监控示例 ===');
  
  const dbLogger = createModuleLogger('database');
  
  // 模拟数据库查询
  const startTime = Date.now();
  
  // 模拟异步操作
  setTimeout(() => {
    const duration = Date.now() - startTime;
    
    if (duration > 1000) {
      dbLogger.warn({ 
        query: 'SELECT * FROM users WHERE active = true',
        duration,
        threshold: 1000
      }, '数据库查询耗时过长');
    } else {
      dbLogger.info({ 
        query: 'SELECT * FROM users WHERE active = true',
        duration,
        resultCount: 150
      }, '数据库查询完成');
    }
  }, 100);
}

// 错误处理示例
function errorHandlingDemo() {
  console.log('\n=== 错误处理示例 ===');
  
  const serviceLogger = createModuleLogger('user-service');
  
  try {
    // 模拟抛出错误
    throw new Error('用户不存在');
  } catch (error) {
    serviceLogger.error({
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      operation: 'getUserById',
      userId: 'invalid_user_id',
      timestamp: new Date().toISOString()
    }, '获取用户信息失败');
  }
  
  // 模拟网络错误
  serviceLogger.error({
    error: 'ENOTFOUND',
    host: 'api.external-service.com',
    port: 443,
    timeout: 5000,
    retryCount: 3
  }, '外部服务调用失败');
}

// 运行所有示例
export function runLoggerDemo() {
  console.log('🚀 开始日志库演示...');
  
  basicLoggingDemo();
  structuredLoggingDemo();
  moduleLoggingDemo();
  requestLoggingDemo();
  performanceLoggingDemo();
  errorHandlingDemo();
  
  console.log('\n✅ 日志库演示完成！');
  console.log('💡 提示：在开发环境中，日志会以彩色格式显示');
  console.log('📝 查看 LOGGER_USAGE.md 了解更多使用方法');
}

// 如果直接运行此文件
if (require.main === module) {
  runLoggerDemo();
}