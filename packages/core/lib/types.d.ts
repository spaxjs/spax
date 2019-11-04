import { InitHook, ParseHook, RenderHook } from "./hooks";
export interface ObjectOf<V = any> {
    [key: string]: V;
}
export interface IHooks {
    init: InitHook;
    parse: ParseHook<IBlock, IBlock>;
    render: RenderHook<any>;
}
export declare type TPreOrPost = "pre" | "post";
export interface IPlugin {
    name: string;
    deps?: string[];
    plug: (hooks: IHooks, option: IOption, options: IOptions) => void;
}
export interface IBlock extends ObjectOf {
    $$parsed?: boolean;
    blocks?: IBlock[];
}
export interface IOption extends ObjectOf {
}
export interface IOptions extends ObjectOf<IOption> {
}
