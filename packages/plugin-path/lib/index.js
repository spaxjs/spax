import { warn } from "@spax/debug";
import pathToRegexp from "path-to-regexp";
export default [
    "Path",
    [],
    ({ parse }, option) => {
        parse.tap((current, parent) => {
            return {
                ...current,
                ...normalizePath(current, parent, option),
            };
        });
    },
];
function normalizePath(current, parent, option) {
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
    const pathKeys = [];
    const pathRE = pathToRegexp(path, pathKeys);
    return {
        path,
        pathRE,
        pathKeys,
    };
}
