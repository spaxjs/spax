import EventEmitter from "events";
import { useEffect, useState } from "react";
import { AnyObject } from "./types";

const map: Map<string, any> = new Map();
const events = new EventEmitter();

export const cache = {
  snapshot(): AnyObject {
    const snapshot = {};
    map.forEach((value, key) => {
      Object.assign(snapshot, {[key]: value});
    });
    return snapshot;
  },
  restore(snapshot: AnyObject): void {
    map.clear();
    Object.entries(snapshot).forEach(([key, value]: [string, any]) => {
      map.set(key, value);
    });
  },
  clear(): void {
    map.clear();
  },
  get<S = any>(key: string): S {
    return map.get(key);
  },
  set(key: string, value: any, shouldEmit: boolean = false): void {
    map.set(key, value);
    if (shouldEmit) {
      events.emit(key, value);
    }
  },
  has(key: string): boolean {
    return map.has(key);
  },
  on(key: string, listener: any): void {
    events.on(key, listener);
  },
  off(key: string, listener: any): void {
    events.off(key, listener);
  },
};

export function useCached<S>(key: string): [S, (v: S) => void] {
  const [state, setState] = useState(cache.get(key));

  useEffect(() => {
    cache.on(key, setState);
    return () => {
      cache.off(key, setState);
    };
  }, []);

  return [
    state,
    (value) => {
      cache.set(key, value, true);
    },
  ];
}
