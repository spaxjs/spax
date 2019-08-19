const cache: Map<string, any> = new Map();

export default {
  key(key: string, scope: string): string {
    return `${scope}&${key}`;
  },
  get(key: string, scope: string) {
    return cache.get(this.key(key, scope));
  },
  set(key: string, value: any, scope: string) {
    return cache.set(this.key(key, scope), value);
  },
  has(key: string, scope: string) {
    return cache.has(this.key(key, scope));
  },
};
