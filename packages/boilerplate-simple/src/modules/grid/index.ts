export default [
  // list
  {
    path: "grid",
    title: "Grid",
    icon: "table",
    lazy: () => import("./List"),
  },
  // detail
  {
    path: "grid/:id",
    lazy: () => import("./View"),
  },
  // edit
  {
    path: "grid/:id/edit",
    lazy: () => import("./Edit"),
  },
];
