export default {
  path: "persist",
  title: "usePersistState",
  description: "状态持久化到本地",
  icon: "sync",
  lazy: () => import("../../../components/PersistCount"),
};
