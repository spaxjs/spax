import { Menu } from "@material-ui/icons";

export default {
  path: "nested",
  title: "Nested",
  icon: Menu,
  lazy: () => import("./UI"),
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
