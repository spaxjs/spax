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
export type TPlugin = (hooks: IHooks) => void;

export interface IBlock extends AnyObject {
  blocks?: IBlock[];
}

export interface IPluginOption extends AnyObject {}

export type IPO = IPluginOption;

export interface IPluginOptions extends AnyObject<IPluginOption>{}

export interface IOptions {
  // 运行范围
  scope?: string;
  // 插件选项
  plugins?: IPluginOptions;
  // 业务模块
  blocks?: IBlock[];
}
