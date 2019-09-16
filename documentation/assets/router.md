# Router

router in hooks

![npm (scoped)](https://img.shields.io/npm/v/@spax/router?color=4caf50)

## 源码 Code

[@spax/router](https://github.com/crossjs/spax/tree/master/packages/router)

## 安装 Install

```bash
$ yarn add @spax/router
```

## 使用 Usage

in `@spax/plugin-router`

```typescript
import { Router, Switch, Carrier, Link, useMatched } from "@spax/router";

export default ({ render }: ISlots) => {
  render.tap(
    "Router",
    [],
    (blocks: IBlock[], {useAuth, NotFound, Forbidden}: IPO, { scope }: IOptions): React.ReactNode => {
      return (
        <Switch
          level={1}
          blocks={blocks}
          scope={scope}
          loose={false}
          useAuth={useAuth}
          NotFound={NotFound}
          Forbidden={Forbidden}
        />
      );
    },
  );
};
```

更多请查看 `@spax/demo-mui`
