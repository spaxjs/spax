export default {
  path: "nest",
  title: "Nest",
  lazy: () => import("./UI"),
  modules: [
    import("../grid"),
    import("./modules/c1"),
    import("./modules/c2"),
    // 404
    {
      path: "*",
      lazy: () => import("./components/NotFound"),
    },
  ],
};
