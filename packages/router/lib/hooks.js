import { parseBlocks } from "@spax/core";
import { debug } from "@spax/debug";
import { usePathname } from "@spax/history";
import React, { useEffect, useMemo, useState } from "react";
import { Switch } from "./components";
export function useBlock({ $$block }) {
    return $$block;
}
export function useExact({ $$exact }) {
    return $$exact;
}
export function useMatchedBlockAndParams(level = 1, blocks, loose = false) {
    const [pathname] = usePathname();
    return useMemo(() => {
        // `/a/b/c` -> `["/a", "/b", "/c"]`
        const tokens = pathname.match(/\/[^?/]+/gi) || ["/"];
        let n = tokens.length;
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
                        // TODO 如果路由有默认的 prefix，
                        // 则此处的 tokens.length 应该减去 prefix 提供的 token 长度
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
        return fallbackBlock
            ? [fallbackBlock, { $$is404: true }]
            : null;
    }, [pathname, level]);
}
export function useMatchedFromChildBocks({ $$exact, $$block, $$NotFound, }) {
    // 如果没有子模块，则返回空
    return $$block.blocks && $$block.blocks.length
        ? ({ children = null, ...props }) => (React.createElement(Switch, Object.assign({ level: $$block.level + 1, blocks: $$block.blocks, 
            // 当前已完整匹配到，如果未匹配到子模块，不用显示 404。
            loose: $$exact, NotFound: $$NotFound }, props), children))
        : ({ children = null }) => children;
}
export function useMatchedFromChildBocksOnTheFly({ $$exact, $$block, $$NotFound }, $$blocks) {
    const [parsedBlocks, setParsedBlocks] = useState($$blocks || []);
    useEffect(() => {
        if ($$blocks) {
            parseBlocks($$blocks, $$block).then(setParsedBlocks);
        }
        else {
            setParsedBlocks([]);
        }
    }, [$$blocks]);
    // 如果没有子模块，则返回空
    return parsedBlocks.length
        ? ({ children = null, ...props }) => (React.createElement(Switch, Object.assign({ level: $$block.level + 1, blocks: parsedBlocks, 
            // 当前已完整匹配到，如果未匹配到子模块，不用显示 404。
            loose: $$exact, NotFound: $$NotFound }, props), children))
        : ({ children = null }) => children;
}
