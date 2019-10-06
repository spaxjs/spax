import EventEmitter from "events";
import { AnyObject } from "./types";

const map: Map<string, any> = new Map();
const events = new EventEmitter();

export const cache = {
  /**
   * Take snapshots from cache
   */
  snapshot(): AnyObject {
    const snapshot = {};
    map.forEach((value, key) => {
      Object.assign(snapshot, {[key]: value});
    });
    return snapshot;
  },

  /**
   * Restore cache from snapshots
   */
  restore(snapshot: AnyObject): void {
    map.clear();
    Object.entries(snapshot).forEach(([key, value]: [string, any]) => {
      map.set(key, value);
    });
  },

  /**
   * Clear cache
   */
  clear(): void {
    map.clear();
  },

  /**
   * Get a cached value with the provided key
   */
  get<S = any>(key: string): S {
    return map.get(key);
  },

  /**
   * Set the cache value of the specified key
   * Would fire a event when the third parameter is true
   */
  set(key: string, value: any, shouldEmit: boolean = false): void {
    map.set(key, value);
    if (shouldEmit) {
      events.emit(key, value);
    }
  },

  /**
   * Check if the cache stored the value of the specified key
   */
  has(key: string): boolean {
    return map.has(key);
  },

  /**
   * Add a event listener of the specified key
   */
  on(key: string, listener: any): void {
    events.on(key, listener);
  },

  /**
   * Remove a event listener of the specified key
   */
  off(key: string, listener: any): void {
    events.off(key, listener);
  },
};
