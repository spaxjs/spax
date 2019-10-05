export default {
  path: "c2",
  title: "C2",
  lazy: () => import("blocks/nested/UI"),
  blocks: [
    import("../c1/blocks/c1"),
    import("../c1/blocks/c2"),
  ],
};
