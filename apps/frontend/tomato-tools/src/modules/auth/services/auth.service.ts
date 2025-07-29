import { createClient } from '@/lib/supabase/server';
import { UserService } from './user.service';
import { createModuleLogger } from '@/lib/logger';
import type { AuthResponse, User as SupabaseUser } from '@supabase/supabase-js';

const log = createModuleLogger('auth-service');

export interface RegisterData {
  email: string;
  password: string;
  fullName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface UpdatePasswordData {
  token: string;
  newPassword: string;
}

export class AuthService {
  private userService: UserService;
  private logger;

  constructor(requestId?: string) {
    this.userService = new UserService(requestId);
    this.logger = requestId ? log.child({ requestId }) : log;
  }

  // 用户注册
  async register(data: RegisterData): Promise<{ user: SupabaseUser | null; error: string | null }> {
    this.logger.info({ email: data.email }, 'User registration attempt');
    
    try {
      const supabase = await createClient();
      
      // 使用Supabase进行注册
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      });

      if (authError) {
        this.logger.error({ error: authError.message, email: data.email }, 'Registration failed');
        return { user: null, error: authError.message };
      }

      if (authData.user) {
        // 在本地数据库中创建用户记录
        try {
          await this.userService.createUser({
            id: authData.user.id,
            email: data.email,
            fullName: data.fullName || null,
            avatarUrl: authData.user.user_metadata?.avatar_url || null,
          });

          // 创建用户配置
          await this.userService.createUserProfile({
            userId: authData.user.id,
          });

          this.logger.info({ userId: authData.user.id }, 'User registered successfully');
        } catch (dbError) {
          this.logger.error({ error: dbError, userId: authData.user.id }, 'Failed to create user in database');
          // 注意：这里Supabase用户已创建，但本地数据库失败
          // 可以考虑实现补偿机制或者在用户首次登录时重试
        }
      }

      return { user: authData.user, error: null };
    } catch (error) {
      this.logger.error({ error, email: data.email }, 'Registration error');
      return { user: null, error: 'Registration failed' };
    }
  }

  // 用户登录
  async login(data: LoginData, ipAddress?: string, userAgent?: string): Promise<{ user: SupabaseUser | null; error: string | null }> {
    this.logger.info({ email: data.email }, 'User login attempt');
    
    try {
      const supabase = await createClient();
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        this.logger.error({ error: authError.message, email: data.email }, 'Login failed');
        return { user: null, error: authError.message };
      }

      if (authData.user && authData.session) {
        // 记录登录会话
        try {
          await this.userService.createUserSession({
            userId: authData.user.id,
            sessionId: authData.session.access_token,
            ipAddress: ipAddress || null,
            userAgent: userAgent || null,
          });

          this.logger.info({ userId: authData.user.id }, 'User logged in successfully');
        } catch (dbError) {
          this.logger.error({ error: dbError, userId: authData.user.id }, 'Failed to record login session');
          // 登录成功但会话记录失败，不影响登录流程
        }
      }

      return { user: authData.user, error: null };
    } catch (error) {
      this.logger.error({ error, email: data.email }, 'Login error');
      return { user: null, error: 'Login failed' };
    }
  }

  // 用户登出
  async logout(sessionToken?: string): Promise<{ error: string | null }> {
    this.logger.info('User logout attempt');
    
    try {
      const supabase = await createClient();
      
      const { error: authError } = await supabase.auth.signOut();

      if (authError) {
        this.logger.error({ error: authError.message }, 'Logout failed');
        return { error: authError.message };
      }

      // 结束本地会话记录
      if (sessionToken) {
        try {
          await this.userService.endUserSession(sessionToken);
        } catch (dbError) {
          this.logger.error({ error: dbError }, 'Failed to end session in database');
          // 登出成功但会话结束记录失败，不影响登出流程
        }
      }

      this.logger.info('User logged out successfully');
      return { error: null };
    } catch (error) {
      this.logger.error({ error }, 'Logout error');
      return { error: 'Logout failed' };
    }
  }

  // 发送密码重置邮件
  async sendPasswordResetEmail(data: ResetPasswordData): Promise<{ error: string | null }> {
    this.logger.info({ email: data.email }, 'Password reset email request');
    
    try {
      const supabase = await createClient();
      
      const { error: authError } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
      });

      if (authError) {
        this.logger.error({ error: authError.message, email: data.email }, 'Password reset email failed');
        return { error: authError.message };
      }

      // 可选：在本地数据库中创建重置令牌记录
      try {
        const user = await this.userService.getUserByEmail(data.email);
        if (user) {
          await this.userService.createPasswordResetToken(user.id);
        }
      } catch (dbError) {
        this.logger.error({ error: dbError, email: data.email }, 'Failed to create reset token in database');
        // 不影响主流程
      }

      this.logger.info({ email: data.email }, 'Password reset email sent successfully');
      return { error: null };
    } catch (error) {
      this.logger.error({ error, email: data.email }, 'Password reset email error');
      return { error: 'Failed to send password reset email' };
    }
  }

  // 更新密码
  async updatePassword(data: UpdatePasswordData): Promise<{ error: string | null }> {
    this.logger.info('Password update attempt');
    
    try {
      const supabase = await createClient();
      
      const { error: authError } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (authError) {
        this.logger.error({ error: authError.message }, 'Password update failed');
        return { error: authError.message };
      }

      // 标记重置令牌为已使用（如果有的话）
      try {
        const userId = await this.userService.validatePasswordResetToken(data.token);
        if (userId) {
          await this.userService.markPasswordResetTokenAsUsed(data.token);
        }
      } catch (dbError) {
        this.logger.error({ error: dbError }, 'Failed to mark reset token as used');
        // 不影响主流程
      }

      this.logger.info('Password updated successfully');
      return { error: null };
    } catch (error) {
      this.logger.error({ error }, 'Password update error');
      return { error: 'Failed to update password' };
    }
  }

  // 获取当前用户
  async getCurrentUser(): Promise<{ user: SupabaseUser | null; error: string | null }> {
    try {
      const supabase = await createClient();
      
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        this.logger.error({ error: error.message }, 'Failed to get current user');
        return { user: null, error: error.message };
      }

      return { user, error: null };
    } catch (error) {
      this.logger.error({ error }, 'Get current user error');
      return { user: null, error: 'Failed to get current user' };
    }
  }

  // 刷新会话
  async refreshSession(): Promise<{ error: string | null }> {
    try {
      const supabase = await createClient();
      
      const { error } = await supabase.auth.refreshSession();

      if (error) {
        this.logger.error({ error: error.message }, 'Failed to refresh session');
        return { error: error.message };
      }

      this.logger.debug('Session refreshed successfully');
      return { error: null };
    } catch (error) {
      this.logger.error({ error }, 'Refresh session error');
      return { error: 'Failed to refresh session' };
    }
  }
}