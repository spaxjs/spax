import { InitHook, ParseHook, RenderHook } from "./hooks";

export interface AnyObject<V = any> {
  [key: string]: V;
}

export interface ICoreHooks {
  init: InitHook;
  parse: ParseHook<IModuleDescription, IModuleDescription>;
  render: RenderHook<any>;
}

export type ICH = ICoreHooks;

export type TPriority = "pre" | "post";
export type TCorePlugin = (hooks: ICoreHooks) => void;

export type TCP = TCorePlugin;

export interface IModuleDescription extends AnyObject {
  modules?: IModuleDescription[];
}

export type IMD = IModuleDescription;

export interface IPluginOption extends AnyObject {}

export type IPO = IPluginOption;

export interface IPluginOptions extends AnyObject<IPluginOption>{}

export interface ICoreOptions {
  // 插件选项
  plugins?: IPluginOptions;
  // 业务模块
  modules?: IModuleDescription[];
  // 挂载点
  container?: string | HTMLElement;
}

export type ICO = ICoreOptions;
