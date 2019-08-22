import EventEmitter from "events";
import { TMatchedState } from "./types";

export const matchedDb = {
  value: {},
  emitter: new EventEmitter(),
  pathname: undefined,
  check(scope: string, pathname: string) {
    if (this.pathname !== pathname) {
      this.pathname = pathname;
      this.value[scope] = [];
    }
  },
  ensure(scope: string) {
    if (!this.value.hasOwnProperty(scope)) {
      this.value[scope] = [];
    }
  },
  get(scope: string) {
    this.ensure(scope);
    return this.value[scope];
  },
  add(scope: string, level: number, v: TMatchedState) {
    this.ensure(scope);
    const newValue = [...this.value[scope]];
    newValue[level - 1] = v;
    this.value[scope] = newValue;
    this.emit(scope);
  },
  emit(scope: string) {
    this.emitter.emit(scope, this.value[scope]);
  },
  on(scope: string, cb: any) {
    this.emitter.on(scope, cb);
    return () => {
      this.emitter.off(scope, cb);
    };
  },
};
