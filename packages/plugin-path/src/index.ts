import { IBlock, IHooks, IPlugin } from "@spax/core";
import { warn } from "@spax/debug";

export default {
  name: "Path",
  plug: ({ parse }: IHooks) => {
    parse.tap(
      (current: IBlock, parent: IBlock) => {
        return {
          ...current,
          ...normalizePath(current, parent),
        };
      },
    );
  },
} as IPlugin;

interface PathProps {
  path: string;
}

function normalizePath(current: IBlock, parent: IBlock): PathProps {
  let { path } = current;

  if (path === undefined) {
    path = "";
  }

  // 不支持指定的绝对路径
  else if (path.charAt(0) === "/") {
    warn("`path` should NOT start with `/`: %s", path);
    path = path.replace(/^\/+/, "");
  }

  const father = parent.path === "/" ? "" : (parent.path || "");
  const myself = path ? `/${path}` : "";

  path = `${father}${myself}` || "/";

  return {
    path,
  };
}
