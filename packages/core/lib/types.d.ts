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
declare type TPluginName = string;
declare type TPluginDeps = string[];
declare type TPluginTapper = (hooks: IHooks, option: IPO, options: IOptions) => void;
export declare type TPlugin = [TPluginName, TPluginDeps, TPluginTapper];
export interface IBlock extends AnyObject {
    $$parsed?: boolean;
    blocks?: IBlock[];
}
export interface IPluginOption extends AnyObject {
}
export declare type IPO = IPluginOption;
export interface IPluginOptions extends AnyObject<IPluginOption> {
}
export interface IOptions {
    plugins?: IPluginOptions;
    blocks?: IBlock[];
}
export {};
