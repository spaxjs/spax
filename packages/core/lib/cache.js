import EventEmitter from "events";
const map = new Map();
const events = new EventEmitter();
export const cache = {
    /**
     * Take snapshots from cache
     */
    snapshot() {
        const snapshot = {};
        map.forEach((value, key) => {
            Object.assign(snapshot, { [key]: value });
        });
        return snapshot;
    },
    /**
     * Restore cache from snapshots
     */
    restore(snapshot) {
        map.clear();
        Object.entries(snapshot).forEach(([key, value]) => {
            map.set(key, value);
        });
    },
    /**
     * Clear cache
     */
    clear() {
        map.clear();
    },
    /**
     * Get a cached value with the provided key
     */
    get(key) {
        return map.get(key);
    },
    /**
     * Set the cache value of the specified key
     * Would fire a event when the third parameter is true
     */
    set(key, value, shouldEmit = false) {
        map.set(key, value);
        if (shouldEmit) {
            events.emit(key, value);
        }
    },
    /**
     * Check if the cache stored the value of the specified key
     */
    has(key) {
        return map.has(key);
    },
    /**
     * Add a event listener of the specified key
     */
    on(key, listener) {
        events.on(key, listener);
    },
    /**
     * Remove a event listener of the specified key
     */
    off(key, listener) {
        events.off(key, listener);
    },
};
