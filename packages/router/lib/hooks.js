import { DEFAULT_SCOPE } from "@spax/core";
import React, { useEffect, useState } from "react";
import { Switch } from "./components";
import { matchedDb } from "./utils";
export function useExact({ $$exact }) {
    return $$exact;
}
export function useExtra({ $$extra }) {
    return $$extra;
}
export function useMatched(scope = DEFAULT_SCOPE) {
    const [state, setState] = useState(matchedDb.get(scope));
    useEffect(() => {
        // 因为 useMatched 多处复用，
        // 所以每个组件加载后都要用 useEffect 同步状态
        setState(matchedDb.get(scope));
        return matchedDb.on(scope, setState);
    }, []);
    return state;
}
export function useChild({ $$exact, $$meta: { level, modules }, $$scope, $$useAuth, $$NotFound, $$Forbidden }) {
    // 如果没有子模块，则返回空
    return (modules && modules.length) ? ({ children, ...props }) => (React.createElement(Switch, Object.assign({ level: level + 1, modules: modules, scope: $$scope, 
        // 当前已完整匹配到，如果未匹配到子模块，不用显示 404。
        loose: $$exact, useAuth: $$useAuth, NotFound: $$NotFound, Forbidden: $$Forbidden }, props), children)) : ({ children }) => children;
}
