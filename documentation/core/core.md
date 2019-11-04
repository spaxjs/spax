# 核心引擎 Core

SPAX 的发动机，一般不直接使用，而是在 Framework 中使用。

![npm (scoped)](https://img.shields.io/npm/v/@spax/core?color=4caf50)

## 源码 Code

[@spax/core](https://github.com/spaxjs/spax/tree/master/packages/core)

## 安装 Install

```bash
$ yarn add @spax/core
```

## 使用 Usage

```typescript
import { Core } from "@spax/core";
import * as ReactDOM from "react-dom";

async function mount() {
  const rendered = await run(plugins, options);
  ReactDOM.render(rendered, document.body, () => {
    console.log("mounted!");
  });
}

mount();
```

### 插件列表 plugins

```typescript
Array<({ init, parse, render }: IHooks) => void>
```

### 选项 options

```typescript
{
  // 运行范围，当页面内存在多个 core 实例时有用
  scope?: string;
  // 插件选项
  plugins?: IPluginOption;
  // 业务模块
  blocks?: IBlock[];
}
```
