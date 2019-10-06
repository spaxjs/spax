# Hooks

一些有用的 React hooks

![npm (scoped)](https://img.shields.io/npm/v/@spax/hooks?color=4caf50)

## 源码 Code

[@spax/hooks](https://github.com/spaxjs/spax/tree/master/packages/hooks)

## 安装 Install

```bash
$ yarn add @spax/hooks
```

## 使用 Usage

```typescript
import { useGlobalState } from "@spax/hooks";

function MyFunctionalComponent(props: any) {
  // 使用 events 实现数据同步
  // 使用 localStorage 实现数据持久化
  const [globalState, setGlobalState] = useGlobalState("key-3", "initial value");
}
```
