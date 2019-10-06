# 基础框架 FrameworkSimple

包含了路由与组件懒加载。

![npm (scoped)](https://img.shields.io/npm/v/@spax/framework-simple?color=4caf50)

## 源码 Code

[@spax/framework-simple](https://github.com/crossjs/spax/tree/master/packages/framework-simple)

## 安装 Install

```bash
$ yarn add @spax/framework-simple
```

## 使用 Usage

```typescript
import FrameworkSimple from "@spax/framework-simple";

new FrameworkSimple({ blocks: [ ... ] }).mount(() => {
  console.log("mounted!");
});
```

或定义一个继承 `FrameworkSimple` 的子类，参见 [框架基类 Framework](../core/framework.md)
