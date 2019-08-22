import EventEmitter from "events";
export const matchedDb = {
    value: {},
    emitter: new EventEmitter(),
    pathname: undefined,
    check(scope, pathname) {
        if (this.pathname !== pathname) {
            this.pathname = pathname;
            this.value[scope] = [];
        }
    },
    ensure(scope) {
        if (!this.value.hasOwnProperty(scope)) {
            this.value[scope] = [];
        }
    },
    get(scope) {
        this.ensure(scope);
        return this.value[scope];
    },
    add(scope, level, v) {
        this.ensure(scope);
        const newValue = [...this.value[scope]];
        newValue[level - 1] = v;
        this.value[scope] = newValue;
        this.emit(scope);
    },
    emit(scope) {
        this.emitter.emit(scope, this.value[scope]);
    },
    on(scope, cb) {
        this.emitter.on(scope, cb);
        return () => {
            this.emitter.off(scope, cb);
        };
    },
};
