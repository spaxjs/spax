import { DEFAULT_SCOPE, parseBlocks } from "@spax/core";
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
export function useChild({ $$exact, $$meta, $$scope, $$useAuth, $$NotFound, $$Forbidden, $$blocks }) {
    const [parsedDynamic, setParsedDynamic] = useState($$meta.blocks);
    useEffect(() => {
        if ($$blocks) {
            parseBlocks($$blocks, $$meta, $$scope).then(setParsedDynamic);
        }
    }, [$$blocks]);
    const allChildBlocks = [...$$meta.blocks, ...parsedDynamic];
    // 如果没有子模块，则返回空
    return (allChildBlocks.length) ? ({ children, ...props }) => (React.createElement(Switch, Object.assign({ level: $$meta.level + 1, blocks: allChildBlocks, scope: $$scope, 
        // 当前已完整匹配到，如果未匹配到子模块，不用显示 404。
        loose: $$exact, useAuth: $$useAuth, NotFound: $$NotFound, Forbidden: $$Forbidden }, props), children)) : ({ children }) => children;
}
