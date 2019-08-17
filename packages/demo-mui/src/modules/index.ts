export default [
  import("./login"),
  import("./register"),
  import("./forgot"),
  import("./home"),
  import("./dashboard"),
  import("./hooks"),
  import("./nested"),
  // import("./todo"),
  // import("./grid"),
  // import("./grid2"),
  // import("./group"),
  // 404
  {
    path: "*",
    layout: "blank",
    lazy: () => import("components/exception/NotFound"),
  },
];
