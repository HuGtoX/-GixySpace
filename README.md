# Gixy Workspace

`gixy_work` 工作区，包含多个前端应用和工具包，主要使用 React、TypeScript 和 Vite 构建。

## 项目结构

- `apps/frontend/easy-tools`: 一个基于 React、TypeScript 和 Vite 的前端工具项目。
- `packages/utils`: 包含一些通用工具函数的工具包。

### easy-tools 项目

#### 主要功能

- PDF 合并功能：可以上传多个 PDF 文件并将它们合并成一个文件。
- 包含自定义的头部、工具栏和容器组件。

## 安装依赖

```bash
pnpm install
```

### easy-tools 项目

- `dev`: 启动开发服务器

```bash
cd apps/frontend/easy-tools
pnpm run dev
```

- `build`: 构建项目

```bash
cd apps/frontend/easy-tools
pnpm run build
```

## 贡献指南

如果你想为这个项目做出贡献，请遵循以下步骤：

1. Fork 这个仓库
2. 创建一个新的分支 (`git checkout -b feature/your-feature`)
3. 提交你的更改 (`git commit -am 'Add some feature'`)
4. 将更改推送到分支 (`git push origin feature/your-feature`)
5. 创建一个新的 Pull Request
