import { InitOptions } from "i18next";
interface AnyObject<V = any> {
    [key: string]: V;
}
export declare function setup(options?: InitOptions): void;
export declare function useT(ns?: string): import("react-i18next").UseTranslationResponse;
export declare function addT(resources: AnyObject<AnyObject>, ns?: string): void;
export declare function changeLng(lng: string): void;
export {};
