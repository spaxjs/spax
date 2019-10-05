import { FilterList } from "@material-ui/icons";

export default {
  path: "nested",
  title: "Nested",
  icon: FilterList,
  lazy: () => import("./UI"),
  blocks: [
    import("./blocks/c1"),
    import("./blocks/c2"),
  ],
};
