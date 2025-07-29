# 用户管理系统

本项目已集成完整的用户管理功能，包括用户注册、登录、密码重置等功能，使用 Supabase 作为认证服务，Drizzle ORM 作为数据库操作层，并实现了统一的日志记录功能。

## 功能特性

### 🔐 认证功能
- ✅ 用户注册（邮箱验证）
- ✅ 用户登录/登出
- ✅ 密码重置（邮件重置链接）
- ✅ 会话管理
- ✅ 中间件认证保护

### 👤 用户管理
- ✅ 用户信息管理
- ✅ 用户配置文件
- ✅ 登录会话记录
- ✅ 密码重置令牌管理

### 📊 日志系统
- ✅ 结构化日志记录（Pino）
- ✅ 请求关联ID追踪
- ✅ 模块化日志记录
- ✅ 开发/生产环境配置

### 🏗️ 架构设计
- ✅ 模块化业务逻辑组织
- ✅ 服务层模式
- ✅ 统一错误处理
- ✅ TypeScript 类型安全

## 环境配置

### 1. 环境变量设置

复制 `.env.local.example` 为 `.env.local` 并配置以下变量：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 数据库配置
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# NextAuth 配置
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 日志配置
PINO_LOG_LEVEL=info
NODE_ENV=development
```

### 2. Supabase 设置

1. 创建 Supabase 项目
2. 在 Supabase 控制台中启用邮箱认证
3. 配置邮件模板（可选）
4. 获取项目 URL 和 API 密钥

### 3. 数据库迁移

```bash
# 生成迁移文件
pnpm drizzle-kit generate

# 运行迁移（需要先配置 DATABASE_URL）
pnpm tsx scripts/migrate.ts
```

## 项目结构

```
src/
├── app/
│   ├── api/auth/          # 认证 API 路由
│   │   ├── login/
│   │   ├── register/
│   │   ├── logout/
│   │   ├── reset-password/
│   │   └── me/
│   ├── auth/              # 认证页面
│   │   ├── login/
│   │   ├── register/
│   │   └── reset-password/
│   └── dashboard/         # 用户仪表板
├── components/auth/       # 认证组件
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── ResetPasswordForm.tsx
├── contexts/              # React 上下文
│   └── AuthContext.tsx
├── lib/
│   ├── drizzle/          # 数据库配置
│   │   ├── client.ts
│   │   ├── schema.ts
│   │   └── migrations/
│   ├── logger/           # 日志配置
│   │   └── index.ts
│   └── supabase/         # Supabase 配置
│       ├── client.ts
│       ├── server.ts
│       └── middleware.ts
├── modules/auth/         # 认证业务模块
│   └── services/
│       ├── auth.service.ts
│       └── user.service.ts
└── middleware.ts         # Next.js 中间件
```

## API 接口

### 认证接口

#### POST /api/auth/register
用户注册

```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "用户姓名"
}
```

#### POST /api/auth/login
用户登录

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST /api/auth/logout
用户登出

#### POST /api/auth/reset-password
发送密码重置邮件

```json
{
  "email": "user@example.com"
}
```

#### PUT /api/auth/reset-password
更新密码

```json
{
  "token": "reset_token",
  "newPassword": "new_password123"
}
```

#### GET /api/auth/me
获取当前用户信息

## 使用示例

### 1. 在组件中使用认证

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading, login, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  return (
    <div>
      <h1>Welcome, {user.fullName || user.email}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 2. 保护路由

中间件已配置自动保护以下路径：
- `/dashboard/*`
- `/profile/*`
- `/settings/*`
- `/api/auth/me`
- `/api/auth/logout`
- `/api/user/*`

### 3. 服务层使用

```typescript
import { AuthService } from '@/modules/auth/services/auth.service';
import { UserService } from '@/modules/auth/services/user.service';

// 在 API 路由中使用
const authService = new AuthService(requestId);
const userService = new UserService(requestId);

const result = await authService.login({ email, password });
const user = await userService.getUserById(userId);
```

## 数据库表结构

### users 表
- `id`: UUID (主键，对应 Supabase auth.users.id)
- `email`: 邮箱地址
- `full_name`: 用户姓名
- `avatar_url`: 头像URL
- `role`: 用户角色 (user/admin)
- `is_active`: 账户状态
- `created_at`: 创建时间
- `updated_at`: 更新时间

### user_profiles 表
- `id`: UUID (主键)
- `user_id`: 用户ID (外键)
- `bio`: 个人简介
- `website`: 个人网站
- `location`: 位置
- `preferences`: 用户偏好设置 (JSON)

### user_sessions 表
- `id`: UUID (主键)
- `user_id`: 用户ID (外键)
- `session_id`: 会话ID
- `ip_address`: IP地址
- `user_agent`: 用户代理
- `login_at`: 登录时间
- `logout_at`: 登出时间
- `is_active`: 会话状态

### password_reset_tokens 表
- `id`: UUID (主键)
- `user_id`: 用户ID (外键)
- `token`: 重置令牌
- `expires_at`: 过期时间
- `used_at`: 使用时间
- `created_at`: 创建时间

## 开发指南

### 1. 添加新的认证功能

1. 在 `AuthService` 中添加新方法
2. 创建对应的 API 路由
3. 更新前端组件和上下文
4. 添加必要的数据库表/字段

### 2. 扩展用户模型

1. 更新 `schema.ts` 中的表定义
2. 生成并运行数据库迁移
3. 更新 `UserService` 中的相关方法
4. 更新 TypeScript 类型定义

### 3. 自定义日志记录

```typescript
import { createModuleLogger } from '@/lib/logger';

const log = createModuleLogger('my-module');

log.info({ userId: '123' }, 'User action performed');
log.error({ error }, 'Something went wrong');
```

## 部署注意事项

1. **环境变量**: 确保生产环境中所有必需的环境变量都已正确配置
2. **数据库迁移**: 部署前运行数据库迁移
3. **Supabase 配置**: 配置正确的重定向URL和邮件模板
4. **日志级别**: 生产环境建议使用 `info` 或 `warn` 级别
5. **CORS 设置**: 确保 Supabase 项目的 CORS 设置正确

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查 `DATABASE_URL` 是否正确
   - 确认数据库服务是否运行

2. **Supabase 认证失败**
   - 验证 Supabase URL 和 API 密钥
   - 检查 Supabase 项目设置

3. **邮件发送失败**
   - 确认 Supabase 邮件服务配置
   - 检查邮件模板设置

4. **中间件认证问题**
   - 检查 cookie 设置
   - 验证会话管理逻辑

### 调试技巧

1. 启用详细日志记录：设置 `PINO_LOG_LEVEL=debug`
2. 检查浏览器网络面板中的 API 请求
3. 查看 Supabase 控制台中的认证日志
4. 使用 `console.log` 在客户端组件中调试

## 安全考虑

1. **密码策略**: 当前要求最少6个字符，可根据需要调整
2. **会话管理**: 使用 Supabase 的内置会话管理
3. **CSRF 保护**: Next.js 提供内置保护
4. **XSS 防护**: 使用 React 的内置 XSS 保护
5. **SQL 注入**: Drizzle ORM 提供参数化查询保护

## 许可证

本项目遵循 MIT 许可证。