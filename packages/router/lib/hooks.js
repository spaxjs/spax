import { DEFAULT_SCOPE, parseModules } from "@spax/core";
import React, { useEffect, useState } from "react";
import { Switch } from "./components";
import { matchedDb } from "./utils";
export function useExact({ $$exact }) {
    return $$exact;
}
export function useMeta({ $$meta }) {
    return $$meta;
}
export function useScope({ $$scope }) {
    return $$scope;
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
export function useChild({ $$exact, $$meta, $$scope, $$useAuth, $$NotFound, $$Forbidden, $$modules }) {
    const [parsedDynamic, setParsedDynamic] = useState($$meta.modules);
    useEffect(() => {
        if ($$modules) {
            parseModules($$modules, $$meta, $$scope).then(setParsedDynamic);
        }
    }, [$$modules]);
    const allChildModules = [...$$meta.modules, ...parsedDynamic];
    // 如果没有子模块，则返回空
    return (allChildModules.length) ? ({ children, ...props }) => (React.createElement(Switch, Object.assign({ level: $$meta.level + 1, modules: allChildModules, scope: $$scope, 
        // 当前已完整匹配到，如果未匹配到子模块，不用显示 404。
        loose: $$exact, useAuth: $$useAuth, NotFound: $$NotFound, Forbidden: $$Forbidden }, props), children)) : ({ children }) => children;
}
