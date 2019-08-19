const cache = new Map();
export default {
    key(key, scope) {
        return `${scope}&${key}`;
    },
    get(key, scope) {
        return cache.get(this.key(key, scope));
    },
    set(key, value, scope) {
        return cache.set(this.key(key, scope), value);
    },
    has(key, scope) {
        return cache.has(this.key(key, scope));
    },
};
