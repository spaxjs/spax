export default {
  path: "about",
  lazy: () => import("./UI"),
  data: {
    title: "About us",
  },
  modules: [
    import("./modules/contact"),
  ],
};
