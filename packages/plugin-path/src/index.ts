import { AnyObject, ICoreHooks, IModule, IPluginOption } from "@wugui/core";
import { warn } from "@wugui/utils";
import pathToRegexp, { Key } from "path-to-regexp";

export default ({ parse }: ICoreHooks) => {
  parse.tap("Path", (current: IModule, parent: IModule, option: IPluginOption) => {
    return {
      ...current,
      ...normalizePath(current, parent, option),
    };
  });
};

function normalizePath(current: IModule, parent: IModule, option: IPluginOption): AnyObject {
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
