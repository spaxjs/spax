import EventEmitter from "events";
export const matchedDb = {
    value: [],
    emitter: new EventEmitter(),
    pathname: undefined,
    check(pathname) {
        if (this.pathname !== pathname) {
            this.pathname = pathname;
            this.value = [];
        }
    },
    get() {
        return this.value;
    },
    add(level, v) {
        const newValue = [...this.value];
        newValue[level - 1] = v;
        this.value = newValue;
        this.emit();
    },
    emit() {
        this.emitter.emit("change", this.value);
    },
    on(cb) {
        this.emitter.on("change", cb);
        return () => {
            this.emitter.off("change", cb);
        };
    },
};
