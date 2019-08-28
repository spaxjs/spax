import Framework from "framework";
import * as serviceWorker from "serviceWorker";

const options = process.env.NODE_ENV === "production"
  ? require("./config/config.prod")
  : require("./config/config.dev");

// 加载业务模块，挂载到挂载点
new Framework(options.default).mount();

process.env.NODE_ENV === "production"
  ? serviceWorker.register()
  : serviceWorker.unregister();
