import { DataUsage } from "@material-ui/icons";

export default {
  path: "persist",
  title: "usePersistState",
  description: "状态持久化到本地",
  icon: DataUsage,
  lazy: () => import("../../../components/PersistCount"),
};
