import React, { Suspense } from "react";
export default ({ parse }) => {
    parse.tap("Lazy", (current, parent, option) => {
        return { ...current, ...handleLazy(current, option) };
    }, (current, parent, option) => {
        // 有可能其它插件会输出异步的 Component，所以这里再做一道处理
        return { ...current, ...handleLazy(current, option) };
    });
};
const weakMap = new WeakMap();
function handleLazy(current, { fallback = React.createElement("div", null, "...") }) {
    const { lazy } = current;
    if (lazy) {
        if (!weakMap.has(lazy)) {
            weakMap.set(lazy, React.lazy(lazy));
        }
        return {
            lazy: null,
            component: (props) => {
                const L = weakMap.get(lazy);
                return (React.createElement(Suspense, { fallback: fallback },
                    React.createElement(L, Object.assign({}, props))));
            },
        };
    }
    return null;
}
