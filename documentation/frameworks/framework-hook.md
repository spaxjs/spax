# 基础框架 FrameworkHook

拥抱 React Hooks，希望一切都是 Hook 的，尽可能地少用 Component Class。

![npm (scoped)](https://img.shields.io/npm/v/@spax/framework-hook?color=4caf50)

## 源码 Code

[@spax/framework-hook](https://github.com/crossjs/spax/tree/master/packages/framework-hook)

## 安装 Install

```bash
$ yarn add @spax/framework-hook
```

## 使用 Usage

```typescript
import FrameworkHook from "@spax/framework-hook";

new FrameworkHook({ blocks: [ ... ] }).mount(() => {
  console.log("mounted!");
});
```

或定义一个继承 `FrameworkHook` 的子类，参见 [框架基类 Framework](../core/framework.md)
