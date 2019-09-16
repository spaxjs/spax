import { IBlock, IOptions, IPlugin } from "./types";
export declare function run(plugins?: IPlugin[], options?: IOptions): Promise<any>;
/**
 * parse 函数允许重复执行，
 * 生成的数据将会覆盖原有数据。
 */
export declare function runParse(blocks?: IBlock[], shouldEmit?: boolean): Promise<IBlock[]>;
/**
 * render 函数允许重复执行，
 * 生成的数据将会覆盖原有数据。
 */
export declare function runRender(blocks?: IBlock[], shouldEmit?: boolean): Promise<any>;
export declare function useParsed(): [IBlock[], (v: IBlock[]) => void];
export declare function useRendered(): [any, (v: any) => void];
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
export declare function parseBlocks(blocks: IBlock[], parent: IBlock, fromInnerCall?: boolean): Promise<IBlock[]>;
