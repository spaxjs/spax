import EventEmitter from "events";
const map = new Map();
const events = new EventEmitter();
export default {
    key(key, scope) {
        return `${scope}&${key}`;
    },
    get(key, scope) {
        return map.get(this.key(key, scope));
    },
    set(key, value, scope) {
        return map.set(this.key(key, scope), value);
    },
    has(key, scope) {
        return map.has(this.key(key, scope));
    },
    on(key, listener, scope) {
        events.on(this.key(key, scope), listener);
    },
    off(key, listener, scope) {
        events.off(this.key(key, scope), listener);
    },
    emit(key, scope) {
        events.emit(this.key(key, scope), this.get(key, scope));
    },
};
