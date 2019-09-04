import EventEmitter from "events";
import { useEffect, useState } from "react";
const map = new Map();
const events = new EventEmitter();
export const cache = {
    snapshot() {
        const snapshot = {};
        map.forEach((value, key) => {
            Object.assign(snapshot, { [key]: value });
        });
        return snapshot;
    },
    restore(snapshot) {
        map.clear();
        Object.entries(snapshot).forEach(([key, value]) => {
            map.set(key, value);
        });
    },
    clear() {
        map.clear();
    },
    get(key) {
        return map.get(key);
    },
    set(key, value, shouldEmit = false) {
        map.set(key, value);
        if (shouldEmit) {
            events.emit(key, value);
        }
    },
    has(key) {
        return map.has(key);
    },
    on(key, listener) {
        events.on(key, listener);
    },
    off(key, listener) {
        events.off(key, listener);
    },
};
export function useCached(key) {
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
