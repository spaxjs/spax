import { IOptions as ICoreOptions } from "@spax/core";
export interface IOptions extends ICoreOptions {
    version?: string;
    container?: string | HTMLElement;
}
