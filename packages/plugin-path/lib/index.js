import { warn } from "@spax/debug";
export default {
    name: "Path",
    deps: [],
    plug: ({ parse }) => {
        parse.tap((current, parent) => {
            return {
                ...current,
                ...normalizePath(current, parent),
            };
        });
    },
};
function normalizePath(current, parent) {
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
    return {
        path,
    };
}
