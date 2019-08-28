import { DEFAULT_SCOPE, parseBlocks } from "@spax/core";
import { debug } from "@spax/debug";
import React, { useEffect, useMemo, useState } from "react";
import { Switch } from "./components";
import { matchedDb } from "./utils";
export function useBlock({ $$block }) {
    return $$block;
}
export function useExact({ $$exact }) {
    return $$exact;
}
export function useScope({ $$scope }) {
    return $$scope;
}
export function useMatchedArrayOfBlockAndParams(scope = DEFAULT_SCOPE) {
    const [state, setState] = useState([]);
    useEffect(() => {
        // 因为 useMatchedArrayOfBlockAndParams 多处复用，
        // 所以每个组件加载后都要用 useEffect 同步状态
        setState(matchedDb.get(scope));
        return matchedDb.on(scope, setState);
    }, []);
    return state;
}
export function useMatchedBlockAndParams(scope = DEFAULT_SCOPE, pathname, level = 1, blocks, loose = false) {
    return useMemo(() => {
        // `/a/b/c` -> `["/a", "/b", "/c"]`
        const tokens = pathname.match(/\/[^?/]+/ig) || ["/"];
        const matchedBlockAndParams = ((n) => {
            let fallbackBlock = null;
            // 从寻找`完整`匹配到寻找`父级`匹配
            while (n--) {
                const toPath = tokens.slice(0, n + 1).join("");
                for (let i = 0; i < blocks.length; i++) {
                    const childBlock = blocks[i];
                    // 严格模式，才寻找 404
                    if (!loose && childBlock.path.indexOf("*") !== -1) {
                        if (!fallbackBlock) {
                            fallbackBlock = childBlock;
                        }
                        continue;
                    }
                    const execArray = childBlock.pathRE.exec(toPath);
                    if (execArray) {
                        const matchedParams = childBlock.pathKeys.reduce((params, { name }, index) => ({
                            ...params,
                            [name]: execArray[index + 1],
                        }), {
                            $$exact: tokens.length === childBlock.level,
                        });
                        /* istanbul ignore next */
                        if (process.env.NODE_ENV === "development") {
                            debug("Matched of `%s`%s: %O", toPath, matchedParams.$$exact ? " exactly" : "", childBlock);
                        }
                        return [childBlock, matchedParams];
                    }
                }
            }
            return fallbackBlock ? [fallbackBlock, { $$is404: true }] : null;
        })(tokens.length);
        if (matchedBlockAndParams) {
            matchedDb.check(scope, pathname);
            matchedDb.add(scope, level, matchedBlockAndParams);
            return matchedBlockAndParams;
        }
        return null;
    }, [scope, pathname, level]);
}
export function useMatchedFromChildBocks({ $$exact, $$block, $$scope, $$useAuth, $$NotFound, $$Forbidden }) {
    // 如果没有子模块，则返回空
    return ($$block.blocks && $$block.blocks.length) ? ({ children = null, ...props }) => (React.createElement(Switch, Object.assign({ level: $$block.level + 1, blocks: $$block.blocks, scope: $$scope, 
        // 当前已完整匹配到，如果未匹配到子模块，不用显示 404。
        loose: $$exact, useAuth: $$useAuth, NotFound: $$NotFound, Forbidden: $$Forbidden }, props), children)) : ({ children = null }) => children;
}
export function useMatchedFromChildBocksOnTheFly({ $$exact, $$block, $$scope, $$useAuth, $$NotFound, $$Forbidden }, $$blocks) {
    const [parsedBlocks, setParsedBlocks] = useState($$blocks || []);
    useEffect(() => {
        if ($$blocks) {
            parseBlocks($$blocks, $$block, $$scope).then(setParsedBlocks);
        }
        else {
            setParsedBlocks([]);
        }
    }, [$$blocks]);
    // 如果没有子模块，则返回空
    return parsedBlocks.length ? ({ children = null, ...props }) => (React.createElement(Switch, Object.assign({ level: $$block.level + 1, blocks: parsedBlocks, scope: $$scope, 
        // 当前已完整匹配到，如果未匹配到子模块，不用显示 404。
        loose: $$exact, useAuth: $$useAuth, NotFound: $$NotFound, Forbidden: $$Forbidden }, props), children)) : ({ children = null }) => children;
}
