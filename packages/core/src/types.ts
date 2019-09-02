import { InitHook, ParseHook, RenderHook } from "./hooks";

export interface AnyObject<V = any> {
  [key: string]: V;
}

export interface IHooks {
  init: InitHook;
  parse: ParseHook<IBlock, IBlock>;
  render: RenderHook<any>;
}

export type TPriority = "pre" | "post";
type TPluginName = string;
type TPluginDeps = string[];
type TPluginTapper = (hooks: IHooks, option: IPO, options: IOptions) => void;
export type TPlugin = [TPluginName, TPluginDeps, TPluginTapper];

export interface IBlock extends AnyObject {
  $$parsed?: boolean;
  blocks?: IBlock[];
}

export interface IPluginOption extends AnyObject {}

export type IPO = IPluginOption;

export interface IPluginOptions extends AnyObject<IPluginOption>{}

export interface IOptions {
  // 插件选项
  plugins?: IPluginOptions;
  // 业务模块
  blocks?: IBlock[];
}
