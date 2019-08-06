import { Globe } from "grommet-icons/icons";

export default {
  path: "global",
  title: "useGlobalState",
  description: "多个组件间共享全局状态",
  icon: Globe,
  lazy: () => import("./UI"),
};
