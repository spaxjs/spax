import { IBlock, IOptions, TPlugin } from "./types";
export declare const DEFAULT_SCOPE = "\uD83D\uDE80";
export declare function run(plugins?: TPlugin[], options?: IOptions): Promise<any>;
/**
 * 未来，此处有可能是 Reactive 的
 */
export declare function useParsed(scope?: string): [IBlock[]];
/**
 * 未来，此处有可能是 Reactive 的
 */
export declare function useRendered(scope?: string): [any];
/**
 * 递归处理模块，顺序执行 parser
 * @example
 * // blocks: [m1, m2]
 * // parsers: [p1, p2]
 * p1.pre(m1) -> p2.pre(m1) -> p2.post(m1) -> p1.post(m1)
 * p1.pre(m2) -> p2.pre(m2) -> p2.post(m2) -> p1.post(m2)
 * // 如果有子模块（深度优先）
 * p1.pre(m1) -> p2.pre(m1) -> (子模块流程，同父模块) -> p2.post(m1) -> p1.post(m1)
 */
export declare function parseBlocks(blocks: IBlock[], parent?: IBlock, scope?: string): Promise<IBlock[]>;
