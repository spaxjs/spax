/// <reference types="react" />
import { TCP } from "@spax/core";
import { IFO } from "./types";
export * from "./types";
export default abstract class Framework {
    static plugins: TCP[];
    static options: IFO;
    private plugins;
    private options;
    constructor(options?: IFO);
    render(): Promise<React.DOMElement<any, any>>;
    mount(callback?: () => void): Promise<void>;
    /**
     * 通过原型链实现递归合并
     */
    private initialize;
}
