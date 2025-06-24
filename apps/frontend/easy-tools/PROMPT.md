# 项目文档：easy-tools 前端应用

## 项目概述

`easy-tools` 是一个基于 React 和 Ant Design 的前端应用，提供图片处理等工具功能。项目采用现代化的 React 开发模式，支持明暗主题切换，并实现了通用的文件上传组件和图片处理工具函数。

## 项目结构

```
d:\-GixySpace\apps\frontend\easy-tools\
├── public\            # 静态资源
├── src\
│   ├── components\    # 通用组件
│   ├── context\       # React 上下文
│   ├── hooks\         # 自定义钩子
│   ├── layout\        # 布局组件
│   ├── pages\         # 页面组件
│   ├── router\        # 路由配置
│   └── utils\         # 工具函数
└── 配置文件            # 项目配置
```

## 核心文件说明

### 1. 应用入口文件

<mcfile name="App.tsx" path="d:\-GixySpace\apps\frontend\easy-tools\src\App.tsx"></mcfile>

该文件是应用的入口组件，主要功能包括：

- 配置 Ant Design 主题和国际化
- 支持明暗主题切换
- 提供全局样式配置
- 设置路由系统

关键代码片段：

```tsx:d:-GixySpace\apps\frontend\easy-tools\src\App.tsx
// 主题配置
const themeColors = {
  dark: { bg: "#1F2937", bodyBg: "#111827", inputBg: "#374151" },
  light: { bg: "#FFFFFF", bodyBg: "#F9FAFB", inputBg: "#F3F4F6" }
};

// 组件主题配置
const componentsTheme = (isDarkMode: boolean) => ({
  Input: {
    colorBgContainer: isDarkMode ? themeColors.dark.inputBg : themeColors.light.inputBg,
    borderRadius: 100,
    activeBorderColor: "#FF6347",
    // ...其他组件样式
  },
  // ...其他组件配置
});
```

### 2. 文件上传组件

<mcfile name="FileUploader.tsx" path="d:\-GixySpace\apps\frontend\easy-tools\src\components\FileUploader.tsx"></mcfile>

一个功能完善的通用文件上传组件，支持拖放上传、文件验证和自定义配置。

#### 主要特性

- 支持拖放和点击上传两种方式
- 响应式设计，适配移动端和桌面端
- 多文件上传支持
- 完善的文件验证机制（类型、大小、数量）
- 自定义错误提示
- 上传状态管理

#### Props 接口定义

```tsx:d:-GixySpace\apps\frontend\easy-tools\src\components\FileUploader.tsx
interface FileUploaderProps {
  onFilesAdded: (files: any[]) => void;
  accept?: string; // 允许的文件类型，默认image/*
  maxSizeMobile?: number; // 移动端最大文件大小（MB），默认20
  maxSizeDesktop?: number; // 桌面端最大文件大小（MB），默认50
  uploadText?: string; // 上传提示文本
  disabled?: boolean; // 是否禁用上传
  fileTypeValidator?: (file: File) => boolean; // 自定义文件类型验证函数
  errorMessages?: {
    invalidType?: string; // 文件类型错误提示
    overSize?: string; // 文件大小超限提示
    maxFiles?: string; // 超过最大文件数提示
    filterRejected?: string; // 文件过滤拒绝提示
  };
  // ...其他props
}
```

### 3. 图片处理工具

<mcfile name="imageProcessing.ts" path="d:\-GixySpace\apps\frontend\easy-tools\src\utils\imageProcessing.ts"></mcfile>

提供图片处理相关的工具函数，主要包括：

#### 主要函数

- <mcsymbol name="getMimeType" filename="imageProcessing.ts" path="d:\-GixySpace\apps\frontend\easy-tools\src\utils\imageProcessing.ts" startline="8" type="function"></mcsymbol> - 获取文件MIME类型
- <mcsymbol name="detectImageFormat" filename="imageProcessing.ts" path="d:\-GixySpace\apps\frontend\easy-tools\src\utils\imageProcessing.ts" startline="24" type="function"></mcsymbol> - 检测图片格式
- <mcsymbol name="createPreviewUrl" filename="imageProcessing.ts" path="d:\-GixySpace\apps\frontend\easy-tools\src\utils\imageProcessing.ts" startline="36" type="function"></mcsymbol> - 创建图片预览URL
- <mcsymbol name="convertImage" filename="imageProcessing.ts" path="d:\-GixySpace\apps\frontend\easy-tools\src\utils\imageProcessing.ts" startline="48" type="function"></mcsymbol> - 图片格式转换
- <mcsymbol name="saveImage" filename="imageProcessing.ts" path="d:\-GixySpace\apps\frontend\easy-tools\src\utils\imageProcessing.ts" startline="127" type="function"></mcsymbol> - 保存处理后的图片
- <mcsymbol name="checkFileSizeLimit" filename="imageProcessing.ts" path="d:\-GixySpace\apps\frontend\easy-tools\src\utils\imageProcessing.ts" startline="174" type="function"></mcsymbol> - 检查文件大小是否超限

## 主题配置

应用支持明暗两种主题模式，通过 <mcsymbol name="ThemeProvider" filename="App.tsx" path="d:\-GixySpace\apps\frontend\easy-tools\src\App.tsx" startline="4" type="function"></mcsymbol> 提供主题上下文管理。主题配置包括：

- 颜色方案（背景色、文本色等）
- 组件样式（边框、圆角、阴影等）
- 响应式适配

## 使用示例

### 文件上传组件使用

```tsx
<FileUploader
  onFilesAdded={handleFilesAdded}
  accept="image/*"
  maxSizeMobile={10}
  maxSizeDesktop={20}
  uploadText="上传图片"
  maxFiles={5}
  errorMessages={{
    invalidType: "仅支持图片文件",
    overSize: "文件大小超过限制",
  }}
/>
```

### 图片格式转换

```tsx
import { convertImage } from "@/utils/imageProcessing";

const handleConvert = async (imageFile) => {
  const result = await convertImage(imageFile, {
    format: "webp",
    quality: 80,
    removeBackground: true,
  });
  // 处理转换结果
};
```
