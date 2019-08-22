import EventEmitter from "events";

const map: Map<string, any> = new Map();
const events = new EventEmitter();

export default {
  key(key: string, scope: string): string {
    return `${scope}&${key}`;
  },
  get(key: string, scope: string) {
    return map.get(this.key(key, scope));
  },
  set(key: string, value: any, scope: string) {
    return map.set(this.key(key, scope), value);
  },
  has(key: string, scope: string) {
    return map.has(this.key(key, scope));
  },
  on(key: string, listener: any, scope: string) {
    events.on(this.key(key, scope), listener);
  },
  off(key: string, listener: any, scope: string) {
    events.off(this.key(key, scope), listener);
  },
  emit(key: string, scope: string) {
    events.emit(this.key(key, scope), this.get(key, scope));
  },
};
