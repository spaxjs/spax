import { cache } from "@spax/core/lib/cache";
import * as React from "react";
import * as ReactDOM from "react-dom";
import singleSpaReact, { Lifecycles } from "single-spa-react";
import Root from "./root.component";

/**
 * 异步模式
 */

const reactLifecycles: Promise<Lifecycles> = Root.then((R) => singleSpaReact({
  React,
  ReactDOM,
  rootComponent: (() => R) as any,
  suppressComponentDidCatchWarning: true,
}));

let snapshot: any = {};

export async function bootstrap(props) {
  return (await reactLifecycles).bootstrap(props);
}

export async function mount(props) {
  cache.restore(snapshot);
  return (await reactLifecycles).mount(props);
}

export async function unmount(props) {
  snapshot = cache.snapshot();
  return (await reactLifecycles).unmount(props);
}
