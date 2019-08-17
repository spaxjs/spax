import Framework from "framework";
import modules from "modules";
import * as serviceWorker from "serviceWorker";

// 加载业务模块，挂载到挂载点
new Framework({ modules }).mount();

process.env.NODE_ENV === "production"
  ? serviceWorker.register()
  : serviceWorker.unregister();
