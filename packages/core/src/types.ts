import { InitHook, ParseHook, RenderHook } from "./Hook";

export interface AnyObject<V = any> {
  [key: string]: V;
}

export interface ICoreHooks {
  init: InitHook;
  parse: ParseHook<IModule, IModule>;
  render: RenderHook<any>;
}

export type TPriority = "pre" | "post";
export type TPluginFunction = (hooks: ICoreHooks) => void;

export interface IModule extends AnyObject {
  modules?: IModule[];
}

export interface IPluginOption extends AnyObject {}

export interface IPluginOptions extends AnyObject<IPluginOption>{}

export interface IFrameworkOptions {
  // 版本号
  version?: string;
  // 插件选项
  plugins?: IPluginOptions;
  // 业务模块
  modules?: IModule[];
  // 挂载点
  container?: string | HTMLElement;
}
