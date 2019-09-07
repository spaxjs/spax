# MuiDemo

简单的基于 Material-UI 的脚手架，适用于中后台。

## 启动 Startup

```bash
$ yarn
$ yarn start
```

## 指南 Manual

### 入口文件

`src/index.tsx`

```typescript
// 业务模块列表
import blocks from "blocks";
// 本地框架
import Framework from "framework";
// 启动框架，挂载！
new Framework({ blocks }).mount();
```

### 模块配置

以 `src/blocks/login` 为例

```typescript
export default {
  // 路由路径
  path: "login",
  // 使用的布局，可选值由 layout 插件提供
  layout: "blank",
  // UI 组件，懒加载
  lazy: () => import("./UI"),
  // 数据配置，渲染时合并到 UI 的 props 里
  data: {...},
  // 子模块，数据描述结构同此
  blocks: [...]
};
```
