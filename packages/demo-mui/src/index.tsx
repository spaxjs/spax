import blocks from "blocks";
import Framework from "framework";
import * as serviceWorker from "serviceWorker";

// 加载业务模块，挂载到挂载点
new Framework({ blocks }).mount();

process.env.NODE_ENV === "production"
  ? serviceWorker.register()
  : serviceWorker.unregister();
