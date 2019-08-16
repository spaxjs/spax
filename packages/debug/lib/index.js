function makeArgs(args) {
    if (typeof args[0] === "string") {
        args[0] = `🚀 ${args[0]}`;
    }
    return args;
}
export function log(...args) {
    console.log(...makeArgs(args));
}
export function debug(...args) {
    // console.log 无法显示调用堆栈，所以使用 console.warn
    console.warn(...makeArgs(args));
}
export function warn(...args) {
    console.warn(...makeArgs(args));
}
export function error(...args) {
    console.error(...makeArgs(args));
}
export function trace(...args) {
    console.trace(...makeArgs(args));
}
export function fatal(arg0, ...args) {
    if (args.length) {
        error(...args);
    }
    throw Error(arg0);
}
