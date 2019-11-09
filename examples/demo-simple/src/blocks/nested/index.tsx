export default {
  path: "nested",
  title: "Nested",
  lazy: () => import("./UI"),
  blocks: [
    import("./blocks/c1"),
  ],
};
