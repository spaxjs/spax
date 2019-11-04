import React, { Suspense } from "react";
export default {
    name: "Lazy",
    plug: ({ parse }, option) => {
        parse.tap((current) => {
            return { ...current, ...handleLazy(current, option) };
        }, (current) => {
            // 有可能其它插件会输出异步的 Component，所以这里再做一道处理
            return { ...current, ...handleLazy(current, option) };
        });
    },
};
function handleLazy(current, { fallback = React.createElement("div", null, "...") }) {
    const { lazy } = current;
    if (lazy) {
        return {
            lazy: null,
            component: (props) => {
                const L = React.lazy(lazy);
                return (React.createElement(Suspense, { fallback: fallback },
                    React.createElement(L, Object.assign({}, props))));
            },
        };
    }
    return null;
}
