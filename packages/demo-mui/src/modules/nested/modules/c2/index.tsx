export default {
  path: "c2",
  title: "C2",
  lazy: () => import("modules/nested/components/UI"),
  modules: [
    import("../c1/modules/c1"),
    import("../c1/modules/c2"),
  ],
};
