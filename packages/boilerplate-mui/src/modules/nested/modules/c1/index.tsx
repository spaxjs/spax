export default {
  path: "c1",
  title: "C1",
  // description: "C1 from Nested",
  lazy: () => import("modules/nested/components/UI"),
  modules: [
    import("./modules/c0"),
    import("./modules/c1"),
    import("./modules/c2"),
  ],
};
