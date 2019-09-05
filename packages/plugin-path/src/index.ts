import { IBlock, IHooks, TPlugin } from "@spax/core";
import { warn } from "@spax/debug";
import pathToRegexp, { Key } from "path-to-regexp";

export default [
  "Path",
  [],
  ({ parse }: IHooks) => {
    parse.tap(
      (current: IBlock, parent: IBlock) => {
        return {
          ...current,
          ...normalizePath(current, parent),
        };
      },
    );
  },
] as TPlugin;

interface PathProps {
  path: string;
  pathRE: RegExp;
  pathKeys: Key[];
}

function normalizePath(current: IBlock, parent: IBlock): PathProps {
  let { path } = current;

  if (path === undefined) {
    path = "";
  }

  // 404
  else if (path === "*") {
    path = "(.*)";
  }

  // 不支持指定的绝对路径
  else if (path.charAt(0) === "/") {
    warn("`path` should NOT start with `/`: %s", path);
    path = path.replace(/^\/+/, "");
  }

  const father = parent.path === "/" ? "" : (parent.path || "");
  const myself = path ? `/${path}` : "";

  path = `${father}${myself}`;

  const pathKeys: Key[] = [];
  const pathRE = pathToRegexp(path, pathKeys);

  return {
    path,
    pathRE,
    pathKeys,
  };
}
