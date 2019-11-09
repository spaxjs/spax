export default {
  path: "c1",
  title: "C1",
  lazy: () => import("blocks/nested/UI"),
  blocks: [
    import("./blocks/c1"),
    import("./blocks/c2"),
    {
      path: "",
      title: "C1C0",
      lazy: () => import("blocks/nested/UI"),
      blocks: [{
        path: "",
        title: "C1C0C0",
        lazy: () => import("blocks/nested/UI"),
        blocks: [{
          path: "",
          title: "C1C0C0C0",
          lazy: () => import("blocks/nested/UI"),
        }],
      }],
    },
  ],
};
