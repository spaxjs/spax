import { InitOptions, TFunction } from "i18next";
interface AnyObject<V = any> {
    [key: string]: V;
}
export declare function setup(options?: InitOptions): void;
export declare function useT(ns?: string): [TFunction, (resources: AnyObject) => void];
export declare function useLng(): [string, (lng: string) => void];
export {};
