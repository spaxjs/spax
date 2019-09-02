import { Share } from "@material-ui/icons";

export default {
  path: "global",
  title: "useGlobalState",
  icon: Share,
  lazy: () => import("./UI"),
  data: {
    description: "多个组件间共享全局状态并持久化到本地",
  },
};
