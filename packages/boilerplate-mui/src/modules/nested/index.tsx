import { FilterList } from "@material-ui/icons";

export default {
  path: "nested",
  title: "Nested",
  icon: FilterList,
  lazy: () => import("./components/UI"),
  data: {
    greedy: false,
  },
  modules: [
    import("./modules/c1"),
    import("./modules/c2"),
    // 404
    {
      path: "*",
      lazy: () => import("./components/NotFound"),
    },
  ],
};
