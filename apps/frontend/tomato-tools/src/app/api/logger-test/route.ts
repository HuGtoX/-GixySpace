import {
  createRequestLogger,
  generateCorrelationId,
  getCorrelationId,
} from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";

/**
 * 日志库测试 API
 * 访问 /api/logger-test 来查看日志输出效果
 */
export async function GET(request: NextRequest) {
  // 获取或生成关联ID
  const correlationId =
    getCorrelationId(request.headers) || generateCorrelationId();
  const requestLogger = createRequestLogger(correlationId, "api/logger-test");

  requestLogger.info("开始处理日志测试请求");

  try {
    // 演示不同级别的日志
    requestLogger.trace("这是 trace 级别的日志");
    requestLogger.debug({ requestId: correlationId }, "这是 debug 级别的日志");
    requestLogger.info(
      { userAgent: request.headers.get("user-agent") },
      "这是 info 级别的日志",
    );
    requestLogger.warn({ warning: "test_warning" }, "这是 warn 级别的日志");

    // 模拟一些业务逻辑
    const startTime = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 100)); // 模拟异步操作
    const duration = Date.now() - startTime;

    requestLogger.info(
      {
        operation: "mock_async_operation",
        duration,
        success: true,
      },
      "模拟异步操作完成",
    );

    // 模拟条件性警告
    if (duration > 50) {
      requestLogger.warn(
        {
          duration,
          threshold: 50,
          performance: "slow",
        },
        "操作耗时超过阈值",
      );
    }

    const response = {
      message: "日志测试完成",
      correlationId,
      timestamp: new Date().toISOString(),
      logs: [
        "trace: 最详细的调试信息",
        "debug: 调试信息",
        "info: 一般信息",
        "warn: 警告信息",
        "error: 错误信息（未在此请求中触发）",
        "fatal: 致命错误（未在此请求中触发）",
      ],
    };

    requestLogger.info(
      {
        responseSize: JSON.stringify(response).length,
        status: 200,
      },
      "请求处理成功",
    );

    return NextResponse.json(response);
  } catch (error) {
    requestLogger.error(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        correlationId,
      },
      "请求处理失败",
    );

    return NextResponse.json(
      { error: "内部服务器错误", correlationId },
      { status: 500 },
    );
  }
}

/**
 * POST 请求演示错误日志
 */
export async function POST(request: NextRequest) {
  const correlationId =
    getCorrelationId(request.headers) || generateCorrelationId();
  const requestLogger = createRequestLogger(correlationId, "api/logger-test");

  requestLogger.info("开始处理 POST 请求（错误演示）");

  try {
    const body = await request.json();
    requestLogger.debug({ bodyKeys: Object.keys(body) }, "解析请求体");

    // 故意抛出错误来演示错误日志
    if (body.triggerError) {
      throw new Error("这是一个演示错误");
    }

    requestLogger.info("POST 请求处理成功");
    return NextResponse.json({ message: "成功", correlationId });
  } catch (error) {
    // 演示错误日志记录
    requestLogger.error(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        correlationId,
        endpoint: "/api/logger-test",
        method: "POST",
        timestamp: new Date().toISOString(),
      },
      "POST 请求处理失败",
    );

    return NextResponse.json(
      {
        error: "演示错误已触发",
        correlationId,
        tip: "这是故意的错误，用于演示错误日志记录",
      },
      { status: 400 },
    );
  }
}
