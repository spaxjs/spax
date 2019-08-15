import { addRes } from "@spax/i18n";
import Framework from "framework";
import resources from "i18n";
import modules from "modules";
import * as serviceWorker from "serviceWorker";

// 加载业务模块，挂载到挂载点
new Framework({ modules }).mount(() => {
  addRes(resources);
});

process.env.NODE_ENV === "production"
  ? serviceWorker.register()
  : serviceWorker.unregister();
