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
  loadRootComponent: () => Root as any,
  suppressComponentDidCatchWarning: true,
});

export function bootstrap(props) {
  return reactLifecycles.bootstrap(props);
}

export function mount(props) {
  return reactLifecycles.mount(props);
}

export function unmount(props) {
  return reactLifecycles.unmount(props);
}
