import { IPlugin } from "@spax/core";
import Framework, { IOptions } from "@spax/framework";
export default class SimpleFramework extends Framework {
    static plugins: IPlugin[];
    static options: IOptions;
}
