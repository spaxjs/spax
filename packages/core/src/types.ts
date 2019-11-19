import { InitHook, ParseHook, RenderHook } from "./hooks";

export interface MapOf<V = any> {
  [key: string]: V;
}

export interface IHooks {
  init: InitHook;
  parse: ParseHook<IBlock, IBlock>;
  render: RenderHook<any>;
}

export type TPreOrPost = "pre" | "post";

export interface IPlugin {
  name: string;
  deps?: string[];
  plug: (hooks: IHooks, option: IOption, options: IOptions) => void;
}

export interface IBlock extends MapOf {
  $$parsed?: boolean;
  blocks?: IBlock[];
}

export interface IOption extends MapOf {}

export interface IOptions extends MapOf<IOption>{}
