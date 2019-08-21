import { InitHook, ParseHook, RenderHook } from "./hooks";
export interface AnyObject<V = any> {
    [key: string]: V;
}
export interface IHooks {
    init: InitHook;
    parse: ParseHook<IBlock, IBlock>;
    render: RenderHook<any>;
}
export declare type TPriority = "pre" | "post";
export declare type TPlugin = (hooks: IHooks) => void;
export interface IBlock extends AnyObject {
    blocks?: IBlock[];
}
export interface IPluginOption extends AnyObject {
}
export declare type IPO = IPluginOption;
export interface IPluginOptions extends AnyObject<IPluginOption> {
}
export interface IOptions {
    scope?: string;
    plugins?: IPluginOptions;
    blocks?: IBlock[];
}
