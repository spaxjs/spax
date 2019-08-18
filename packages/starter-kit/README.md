# StarterKit

SPAX Starter Kit。

## 用法 Usage

### 入口文件

`src/index.tsx`

```typescript
// 本地框架
import Framework from "framework";
// 业务模块列表
import modules from "modules";
// 启动框架，挂载！
new Framework({ modules }).mount();
```

### 业务模块配置

以 `src/modules/home` 为例

```typescript
export default {
  // 路由路径，默认为空
  // path: "",
  // UI 组件，懒加载
  lazy: () => import("./UI"),
  // 数据配置，渲染时合并到 UI 的 props 里
  data: {...},
  // 子模块，数据描述结构同此
  modules: [...]
};
```
