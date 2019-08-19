import { ICO, IMD, TCP } from "./types";
export declare const DEFAULT_SCOPE = "\uD83D\uDE80";
export declare function run(plugins?: TCP[], options?: ICO): Promise<any>;
/**
 * 未来，此处有可能是 Reactive 的
 */
export declare function useParsed(scope?: string): [IMD[]];
/**
 * 未来，此处有可能是 Reactive 的
 */
export declare function useRendered(scope?: string): [any];
