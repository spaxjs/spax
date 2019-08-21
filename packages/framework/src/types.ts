import { IOptions as ICoreOptions } from "@spax/core";

export interface IOptions extends ICoreOptions {
  // 版本号
  version?: string;
  // 挂载点
  container?: string | HTMLElement;
}
