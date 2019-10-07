import { AnyObject } from "./types";
export declare const cache: {
    /**
     * Take snapshots from cache
     */
    snapshot(): AnyObject<any>;
    /**
     * Restore cache from snapshots
     */
    restore(snapshot: AnyObject<any>): void;
    /**
     * Clear cache
     */
    clear(): void;
    /**
     * Get a cached value with the provided key
     */
    get<S = any>(key: string): S;
    /**
     * Set the cache value of the specified key
     * Would fire a event when the third parameter is true
     */
    set(key: string, value: any, shouldEmit?: boolean): void;
    /**
     * Check if the cache stored the value of the specified key
     */
    has(key: string): boolean;
    /**
     * Add a event listener of the specified key
     */
    on(key: string, listener: any): void;
    /**
     * Remove a event listener of the specified key
     */
    off(key: string, listener: any): void;
};
