function makeArgs(args: any[]) {
  if (typeof args[0] === "string") {
    args[0] = `🐢 ${args[0]}`;
  }
  return args;
}

export function log(...args: any[]) {
  console.log(...makeArgs(args));
}

export function debug(...args: any[]) {
  // console.log 无法显示调用堆栈，所以使用 console.warn
  console.warn(...makeArgs(args));
}

export function warn(...args: any[]) {
  console.warn(...makeArgs(args));
}

export function error(...args: any[]) {
  console.error(...makeArgs(args));
}

export function trace(...args: any[]) {
  console.trace(...makeArgs(args));
}

export function fatal(arg0: any, ...args: any[]) {
  if (args.length) {
    error(...args);
  }
  throw Error(arg0);
}
