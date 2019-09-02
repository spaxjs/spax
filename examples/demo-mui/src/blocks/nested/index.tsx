import { FilterList } from "@material-ui/icons";

export default {
  path: "nested",
  title: "Nested",
  icon: FilterList,
  lazy: () => import("./components/UI"),
  blocks: [
    import("./blocks/c1"),
    import("./blocks/c2"),
    // 404
    {
      path: "*",
      lazy: () => import("./components/NotFound"),
    },
  ],
};
