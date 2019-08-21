import { TPlugin } from "@spax/core";
import Framework, { IOptions } from "@spax/framework";
export default class SimpleFramework extends Framework {
    static plugins: TPlugin[];
    static options: IOptions;
}
