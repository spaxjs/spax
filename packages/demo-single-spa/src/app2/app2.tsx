import * as React from "react";
import * as ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const reactLifecycles = Root.then((R) => singleSpaReact({
  React,
  ReactDOM,
  rootComponent: () => R,
  domElementGetter,
}));

export async function bootstrap(props) {
  return (await reactLifecycles).bootstrap(props);
}

export async function mount(props) {
  return (await reactLifecycles).mount(props);
}

export async function unmount(props) {
  return (await reactLifecycles).unmount(props);
}

function domElementGetter() {
  // Make sure there is a div for us to render into
  let el = document.getElementById("app3");
  if (!el) {
    el = document.createElement("div");
    el.id = "app3";
    document.body.appendChild(el);
  }

  return el;
}