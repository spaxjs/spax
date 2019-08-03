# 🐢 LazyPlugin

基于 React.Suspense 与 React.Lazy，提供异步组件支持。

## :hammer_and_wrench: 使用 usage

### 安装 install

```bash
yarn add @wugui/plugin-lazy
```

### 示例 examples

添加到 Framework

```ts
import { Framework } from "@wugui/core";
import LazyPlugin from "@wugui/plugin-lazy";

const options = process.env.NODE_ENV === "production"
  ? require("./config/config.prod")
  : require("./config/config.dev");

export default class MyFramework extends Framework {
  public static plugins = [
    // 作为 Framework 的静态属性
    LazyPlugin,
  ];

  public static options: any = options.default;
}
```

使用 Framework

```ts
import MyFramework from "./MyFramework";

const options = process.env.NODE_ENV === "production"
  ? require("./config/config.prod")
  : require("./config/config.dev");

new MyFramework({
  ...options.default,
  modules: [
    import("./modules/home"),
    // 404
    {
      path: "*",
      lazy: () => import("./components/NotFound"),
    },
  ],
}).mount();
```
