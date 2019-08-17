export default {
  path: "c1",
  title: "C1",
  lazy: () => import("modules/nested/components/UI"),
  modules: [{
    path: "",
    title: "C1",
    lazy: () => import("modules/nested/components/UI"),
  }],
};
