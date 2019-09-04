import { cache } from "@spax/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import singleSpaReact, { Lifecycles } from "single-spa-react";
import Root from "./root.component";

/**
 * 同步模式
 */

const reactLifecycles: Lifecycles = singleSpaReact({
  React,
  ReactDOM,
  loadRootComponent: () => Root.then(R => () => R) as any,
  suppressComponentDidCatchWarning: true,
});

let snapshot: any = {};

export function bootstrap(props) {
  return reactLifecycles.bootstrap(props);
}

export function mount(props) {
  cache.restore(snapshot);
  return reactLifecycles.mount(props);
}

export function unmount(props) {
  snapshot = cache.snapshot();
  return reactLifecycles.unmount(props);
}
