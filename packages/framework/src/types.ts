import { ICO } from "@spax/core";

export interface IFrameworkOptions extends ICO {
  // 版本号
  version?: string;
  // 挂载点
  container?: string | HTMLElement;
}

export type IFO = IFrameworkOptions;
