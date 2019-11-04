import blocks from "blocks";
import options from "config";
import Framework from "framework";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "serviceWorker";

new Framework(options).getApp(blocks).then((App) => {
  // 加载业务模块，挂载到挂载点
  ReactDOM.render(<App />, document.querySelector("#root"));
});

process.env.NODE_ENV === "production"
  ? serviceWorker.register()
  : serviceWorker.unregister();
