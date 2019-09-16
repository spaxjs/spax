import { InitSlot, ParseSlot, RenderSlot } from "./slots";

export interface AnyObject<V = any> {
  [key: string]: V;
}

export interface ISlots {
  init: InitSlot;
  parse: ParseSlot<IBlock, IBlock>;
  render: RenderSlot<any>;
}

export type TPriority = "pre" | "post";

export interface IPlugin {
  name: string;
  deps?: string[];
  plug: (hooks: ISlots, option: IPO, options: IOptions) => void;
}

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
