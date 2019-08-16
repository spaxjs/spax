import { InitHook, ParseHook, RenderHook } from "./hooks";
export interface AnyObject<V = any> {
    [key: string]: V;
}
export interface ICoreHooks {
    init: InitHook;
    parse: ParseHook<IModuleDescription, IModuleDescription>;
    render: RenderHook<any>;
}
export declare type ICH = ICoreHooks;
export declare type TPriority = "pre" | "post";
export declare type TCorePlugin = (hooks: ICoreHooks) => void;
export declare type TCP = TCorePlugin;
export interface IModuleDescription extends AnyObject {
    modules?: IModuleDescription[];
}
export declare type IMD = IModuleDescription;
export interface IPluginOption extends AnyObject {
}
export declare type IPO = IPluginOption;
export interface IPluginOptions extends AnyObject<IPluginOption> {
}
export interface ICoreOptions {
    scope?: string;
    plugins?: IPluginOptions;
    modules?: IModuleDescription[];
}
export declare type ICO = ICoreOptions;
