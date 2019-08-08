/**
 * path 为空字符串，
 * 表示与父级拥有同样的 path，
 * 意味着会一同显示。
 */
export default {
  path: "",
  title: "C0",
  lazy: () => import("modules/nested/components/UI"),
  modules: [{
    path: "",
    title: "C0",
    lazy: () => import("modules/nested/components/UI"),
    modules: [{
      path: "",
      title: "C0",
      lazy: () => import("modules/nested/components/UI"),
    }],
  }],
};
