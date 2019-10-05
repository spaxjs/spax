export default [
  import("./login"),
  import("./register"),
  import("./forgot"),
  import("./dashboard"),
  import("./hooks"),
  import("./nested"),
  import("./home"),
  // 404
  {
    path: "*",
    layout: "blank",
    lazy: () => import("components/exception/NotFound"),
  },
];
