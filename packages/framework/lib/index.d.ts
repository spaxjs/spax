/// <reference types="react" />
import { TPlugin } from "@spax/core";
import { IOptions } from "./types";
export * from "./types";
export default abstract class Framework {
    static plugins: TPlugin[];
    static options: IOptions;
    private plugins;
    private options;
    constructor(options?: IOptions);
    render(): Promise<React.DOMElement<any, any>>;
    mount(callback?: () => void): Promise<void>;
    /**
     * 通过原型链实现递归合并
     */
    private initialize;
}
