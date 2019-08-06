import { Manual } from "grommet-icons/icons";

export default {
  path: "persist",
  title: "usePersistState",
  description: "状态持久化到本地",
  icon: Manual,
  lazy: () => import("../../../components/PersistCount"),
};
