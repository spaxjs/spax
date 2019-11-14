import { IBlock, IOptions, IPlugin } from "@spax/core";
import React from "react";
export declare abstract class Framework {
    static plugins: IPlugin[];
    static options: IOptions;
    private plugins;
    private options;
    private core;
    constructor(options?: IOptions);
    createApp(blocks: IBlock[]): Promise<React.ComponentType<{}>>;
    /**
     * 通过原型链实现递归合并
     */
    private initialize;
}
