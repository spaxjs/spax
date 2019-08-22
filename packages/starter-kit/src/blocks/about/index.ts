export default {
  path: "about",
  lazy: () => import("./UI"),
  data: {
    title: "About us",
  },
  blocks: [
    import("./blocks/contact"),
  ],
};
