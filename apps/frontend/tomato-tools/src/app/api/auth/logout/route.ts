import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/modules/auth/auth.service";
import { createRequestLogger, generateCorrelationId } from "@/lib/logger";

export async function POST(request: NextRequest) {
  const correlationId =
    request.headers.get("x-correlation-id") || generateCorrelationId();
  const logger = createRequestLogger(correlationId, "auth/logout");

  logger.info("Logout request received");

  try {
    // 获取会话令牌（如果有的话）
    const authHeader = request.headers.get("authorization");
    const sessionToken = authHeader?.replace("Bearer ", "") || undefined;

    // 创建认证服务实例
    const authService = new AuthService(correlationId);

    // 执行登出
    const result = await authService.logout(sessionToken);

    if (result.error) {
      logger.error({ error: result.error }, "Logout failed");
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    logger.info("User logged out successfully");

    return NextResponse.json(
      { message: "Logout successful" },
      {
        status: 200,
        headers: {
          "x-correlation-id": correlationId,
        },
      },
    );
  } catch (error) {
    logger.error({ error }, "Logout endpoint error");
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: {
          "x-correlation-id": correlationId,
        },
      },
    );
  }
}
