function makeArgs(args: any[]) {
  if (typeof args[0] === "string") {
    args[0] = `🚀 ${args[0]}`;
  }
  return args;
}

export function group(...args: any[]) {
  console.group(...makeArgs(args));
}

export function groupEnd() {
  console.groupEnd();
}

export function log(...args: any[]) {
  console.log(...makeArgs(args));
}

export function debug(...args: any[]) {
  console.debug(...makeArgs(args));
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
