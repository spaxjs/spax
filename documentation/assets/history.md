# History

history hooks

![npm (scoped)](https://img.shields.io/npm/v/@spax/history?color=4caf50)

## 源码 Code

[@spax/history](https://github.com/crossjs/spax/tree/master/packages/history)

## 安装 Install

```bash
$ yarn add @spax/history
```

## 使用 Usage

```typescript
import { useLocation, usePathname, useSearch, useHash } from "@spax/history";

// location: /#/login?name=joe#foo=bar

function MyFunctionalComponent(props: any) {
  const [location, navigate] = useLocation();
  const [pathname, setPathname] = usePathname();
  const [search, setSearch] = useSearch();
  const [hash, setHash] = useHash();

  console.log(location);
  // => { pathname: "/login", search: "name=joe", hash: "foo=bar"}

  console.log(pathname);
  // => "/login"

  console.log(search);
  // => { name: "joe" }

  console.log(hash);
  // => { foo: "bar" }
}
```
