import { IPlugin } from "@spax/core";
import { IOptions } from "./types";
export * from "./types";
export default abstract class Framework {
    static plugins: IPlugin[];
    static options: IOptions;
    private plugins;
    private options;
    constructor(options?: IOptions);
    render(): Promise<any>;
    mount(callback?: () => void): Promise<void>;
    /**
     * 通过原型链实现递归合并
     */
    private initialize;
}
/**
 * 合并对象与数组
 */
export declare function merge(...args: any[]): any;
