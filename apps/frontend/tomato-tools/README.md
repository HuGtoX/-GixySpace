# Tomato Tools - 实用工具集合

一个基于 Next.js 15 开发的实用工具集合，提供多种常用的文件处理和开发工具。

## 🚀 功能特点

### 📄 PDF 工具
- **PDF 合并**: 将多个 PDF 文件合并为一个文件
- **PDF 拆分**: 将单个 PDF 文件拆分为多个文件

### 🖼️ 图片工具
- **图片转换**: 支持多种格式转换（JPG、PNG、WebP、GIF、BMP、TIFF）
- **图片压缩**: 智能压缩，保持质量的同时减小文件大小
- **批量处理**: 支持批量上传和转换
- **格式推荐**: 自动推荐最佳输出格式

### 🔧 Git 工具
- **仓库下载**: 下载 GitHub 仓库的完整代码或指定目录
- **支持私有仓库**: 通过 Personal Access Token 访问私有仓库
- **自动打包**: 自动将文件打包为 ZIP 格式下载

### 💻 开发工具
- **实时编辑渲染**: React 代码编辑器，支持实时预览

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **UI 库**: Ant Design 5.x
- **样式**: Tailwind CSS + Sass
- **状态管理**: React Hooks
- **文件处理**: 
  - PDF: pdf-lib, pdfjs-dist
  - 图片: Canvas API
  - ZIP: JSZip
- **开发工具**: TypeScript, ESLint, Prettier

## 📦 安装和运行

### 环境要求
- Node.js 18+
- pnpm (推荐) 或 npm

### 安装依赖
```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 环境变量配置

#### 本地开发
1. 复制环境变量示例文件：
```bash
cp .env.example .env.local
```

2. 配置 GitHub Token（推荐）：
   - 访问 [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - 创建新的 Classic Token
   - 权限选择：`public_repo`（访问公开仓库）
   - 将生成的 token 填入 `.env.local` 文件的 `GITHUB_TOKEN` 变量

#### Netlify 部署配置
1. 在 Netlify 项目设置中添加环境变量：
   - 变量名：`GITHUB_TOKEN`
   - 变量值：你的 GitHub Personal Access Token
2. 重新部署项目使配置生效

> **为什么需要配置 GitHub Token？**
> - GitHub API 匿名访问限制：每小时 60 次请求
> - 使用 Token 后限制提升至：每小时 5000 次请求
> - Netlify 等云平台的共享 IP 会导致频率限制快速耗尽
> - 配置 Token 可有效避免 403 频率限制错误

### 开发模式
```bash
# 启动开发服务器
npm run dev

# 使用 Turbopack (更快的构建)
npm run dev

# 标准模式
npm run dev:standard

# 带日志美化
npm run dev:pretty
```

### 生产构建
```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 🎯 使用说明

### PDF 工具
1. 访问 `/pdf/concat` 进行 PDF 合并
2. 访问 `/pdf/split` 进行 PDF 拆分
3. 上传文件，按照页面提示操作

### 图片转换
1. 访问 `/image/transform`
2. 上传图片文件（支持拖拽）
3. 选择目标格式和质量设置
4. 点击转换并下载结果

### Git 仓库下载
1. 访问 `/git/download`
2. 输入 GitHub 仓库 URL
3. 可选：指定目录路径
4. 可选：提供 Personal Access Token（用于私有仓库）
5. 点击下载，系统将自动打包并下载

#### GitHub Token 获取方法
1. 登录 GitHub，进入 Settings > Developer settings > Personal access tokens
2. 点击 "Generate new token (classic)"
3. 选择适当的权限（至少需要 `repo` 权限用于私有仓库）
4. 复制生成的 token 并在工具中使用

### 实时编辑渲染
1. 访问 `/dev/realtime-render`
2. 在编辑器中编写 React 代码
3. 实时查看渲染结果

## 🔒 隐私保护

- **本地处理**: 所有文件处理都在浏览器本地进行
- **无数据上传**: 不会将您的文件上传到任何服务器
- **安全可靠**: 源代码开放，可自行部署

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── (tools)/           # 工具页面组
│   │   ├── image/         # 图片工具
│   │   ├── git/           # Git 工具
│   │   └── dev/           # 开发工具
│   ├── api/               # API 路由
│   ├── pdf/               # PDF 工具页面
│   └── layout.tsx         # 根布局
├── components/            # 共享组件
│   ├── layout/           # 布局组件
│   └── ImageViewer/      # 图片查看器
├── config/               # 配置文件
│   └── tools.tsx         # 工具菜单配置
├── lib/                  # 工具库
│   └── imageProcessing.ts # 图片处理逻辑
└── hooks/                # 自定义 Hooks
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目采用 MIT 许可证。

## 🔗 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [Ant Design 文档](https://ant.design/docs/react/introduce-cn)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
