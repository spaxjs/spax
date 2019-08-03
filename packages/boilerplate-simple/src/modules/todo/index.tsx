export default {
  path: "todo",
  authority: ["admin"],
  title: "Todo",
  icon: "unordered-list",
  lazy: () => import("./UI"),
};
