import { IOptions, IPlugin } from "@spax/core";
import { Framework } from "@spax/framework";
export default class SimpleFramework extends Framework {
    static plugins: IPlugin[];
    static options: IOptions;
}
