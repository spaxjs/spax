import { AnyObject, IBlock, IHooks, IPO } from "@spax/core";
import { warn } from "@spax/debug";
import pathToRegexp, { Key } from "path-to-regexp";

export default ({ parse }: IHooks) => {
  parse.tap("Path", (current: IBlock, parent: IBlock, option: IPO) => {
    return {
      ...current,
      ...normalizePath(current, parent, option),
    };
  });
};

function normalizePath(current: IBlock, parent: IBlock, option: IPO): AnyObject {
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
