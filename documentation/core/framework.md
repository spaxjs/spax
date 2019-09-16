# 框架基类 Framework

框架基类，提供插件与配置项的管理，合并各级的静态属性 `plugins` 与 `options`。

![npm (scoped)](https://img.shields.io/npm/v/@spax/framework?color=4caf50)

## 源码 Code

[@spax/framework](https://github.com/crossjs/spax/tree/master/packages/framework)

## 安装 Install

```bash
$ yarn add @spax/framework
```

## 使用 Usage

```typescript
import Framework from "@spax/framework";

class MyFramework extends Framework {
  // 插件
  public static plugins: IPlugin[] = [
    SomePlugin,
    ElsePlugin,
  ];

  // 选项
  public static options: IOptions = {
    ...,
    plugins: {
      // 插件对应的选项
      some: { ... },
      else: { ... },
    },
  };
}

new MyFramework({
  // 业务模块树
  blocks: [ ... ],
}).mount();
```
