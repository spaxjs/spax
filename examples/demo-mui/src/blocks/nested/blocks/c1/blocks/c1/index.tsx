export default {
  path: "c1",
  title: "C1",
  lazy: () => import("blocks/nested/UI"),
  blocks: [{
    path: "",
    title: "C1",
    lazy: () => import("blocks/nested/UI"),
  }],
};
