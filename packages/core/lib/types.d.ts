import { InitSlot, ParseSlot, RenderSlot } from "./slots";
export interface AnyObject<V = any> {
    [key: string]: V;
}
export interface ISlots {
    init: InitSlot;
    parse: ParseSlot<IBlock, IBlock>;
    render: RenderSlot<any>;
}
export declare type TPriority = "pre" | "post";
export interface IPlugin {
    name: string;
    deps?: string[];
    plug: (hooks: ISlots, option: IPO, options: IOptions) => void;
}
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
