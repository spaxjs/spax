import { RvHookup } from "@material-ui/icons";

/**
 * 没有 component，直接显示匹配的子模块
 */
export default {
  path: "hooks",
  title: "Hooks",
  icon: RvHookup,
  description: "一些有用的 React Hooks",
  // component: UI,
  modules: [
    import("./persist"),
    import("./global"),
  ],
};
