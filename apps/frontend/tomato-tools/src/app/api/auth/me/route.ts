import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/modules/auth/auth.service";
import { UserService } from "@/modules/user/user.service";
import { createRequestLogger, generateCorrelationId } from "@/lib/logger";

export async function GET(request: NextRequest) {
  const correlationId =
    request.headers.get("x-correlation-id") || generateCorrelationId();
  const logger = createRequestLogger(correlationId, "auth/me");

  logger.info("Get current user request received");

  try {
    // 创建认证服务实例
    const authService = new AuthService(correlationId);
    const userService = new UserService(correlationId);

    // 获取supabase中用户信息
    const supabaseUser = await authService.getCurrentUser();

    if (supabaseUser.error || !supabaseUser.user) {
      logger.warn({ error: supabaseUser.error }, "No authenticated user found");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 获取用户详细信息和配置
    const [userDetails, userProfile] = await Promise.all([
      userService.getUserById(supabaseUser.user.id),
      userService.getUserProfile(supabaseUser.user.id),
    ]);

    logger.info(
      { userId: supabaseUser.user.id },
      "Current user retrieved successfully",
    );

    return NextResponse.json(
      {
        user: {
          id: supabaseUser.user.id,
          email: supabaseUser.user.email,
          emailConfirmed: supabaseUser.user.email_confirmed_at !== null,
          fullName: userDetails?.fullName || null,
          avatarUrl: userDetails?.avatarUrl || null,
          role: userDetails?.role || "user",
          isActive: userDetails?.isActive ?? true,
          createdAt: userDetails?.createdAt || null,
          profile: userProfile
            ? {
                bio: userProfile.bio,
                website: userProfile.website,
                location: userProfile.location,
                preferences: userProfile.preferences
                  ? JSON.parse(userProfile.preferences)
                  : null,
              }
            : null,
        },
      },
      {
        status: 200,
        headers: {
          "x-correlation-id": correlationId,
        },
      },
    );
  } catch (error) {
    logger.error({ error }, "Get current user endpoint error");
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
