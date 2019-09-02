import EventEmitter from "events";
import { TMatchedState } from "./types";

export const matchedDb = {
  value: [],
  emitter: new EventEmitter(),
  pathname: undefined,
  check(pathname: string) {
    if (this.pathname !== pathname) {
      this.pathname = pathname;
      this.value = [];
    }
  },
  get() {
    return this.value;
  },
  add(level: number, v: TMatchedState) {
    const newValue = [...this.value];
    newValue[level - 1] = v;
    this.value = newValue;
    this.emit();
  },
  emit() {
    this.emitter.emit("change", this.value);
  },
  on(cb: any) {
    this.emitter.on("change", cb);
    return () => {
      this.emitter.off("change", cb);
    };
  },
};
