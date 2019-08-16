import { TCP } from "@spax/core";
import Framework, { IFO } from "@spax/framework";
export default class SimpleFramework extends Framework {
    static plugins: TCP[];
    static options: IFO;
}
