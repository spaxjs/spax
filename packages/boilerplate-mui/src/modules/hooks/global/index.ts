import { Share } from "@material-ui/icons";

export default {
  path: "global",
  title: "useGlobalState",
  description: "多个组件间共享全局状态",
  icon: Share,
  lazy: () => import("./UI"),
};
