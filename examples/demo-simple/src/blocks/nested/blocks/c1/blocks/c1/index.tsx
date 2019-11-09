export default {
  path: "c1",
  title: "C1C1",
  lazy: () => import("blocks/nested/UI"),
  blocks: [{
    path: "",
    title: "C1C1C1",
    lazy: () => import("blocks/nested/UI"),
  }],
};
