## 项目编码规范

### 类型规范

- 业务编写过程中尽量完善类型定义，完善后不应存在any类型

### 目录结构规范

- 每个路由页面必须新建一个文件夹
- 组件文件夹为components，不建议嵌套多层
- 当组件关联文件较多时也需要使用文件夹包裹
- 多个页面使用到的组件放到src/components下
- 通用性较强的组件可以单独放到子包中

### 命名规范

- 页面文件使用小驼峰命名
- 组件文件使用大驼峰命名
- 样式文件使用小驼峰命名
- 样式文件使用\*.module.scss后缀

### 主题色

在写样式时，尽量使用主题色，一是为了统一页面风格，其次是为了后续的主题切换需求准备。
例如：

```css
.btn {
	color: var(--theme-text-color);
	background-color: var(--theme-backgroud-color);
	border-color: var(--theme-border-color);
}
```
