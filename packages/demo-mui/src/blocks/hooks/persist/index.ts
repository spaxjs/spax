import { DataUsage } from "@material-ui/icons";

export default {
  path: "persist",
  title: "usePersistState",
  icon: DataUsage,
  lazy: () => import("components/PersistCount"),
  data: {
    description: "状态持久化到本地",
  },
};
