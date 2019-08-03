export default [
  // list
  {
    path: "grid2",
    title: "Grid 2",
    icon: "table",
    lazy: () => import("./List"),
    modules: [
      // detail
      {
        path: ":id",
        title: ":id",
        lazy: () => import("../grid/View"),
      },
      // edit
      {
        path: ":id/edit",
        lazy: () => import("../grid/Edit"),
      },
    ],
  },
];
