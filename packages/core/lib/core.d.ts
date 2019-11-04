import { IBlock, IOptions, IPlugin } from "./types";
export declare class Core {
    private plugins;
    private options;
    private hooks;
    constructor(plugins?: IPlugin[], options?: IOptions);
    run(blocks?: IBlock[]): Promise<any>;
    parse(blocks?: IBlock[]): Promise<IBlock[]>;
    render(blocks?: IBlock[]): Promise<any>;
    private initHooks;
    private initPlugins;
    private parseBlocks;
    private parseBlock;
}
