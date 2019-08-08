import { Grain } from "@material-ui/icons";

export default {
  path: "hash",
  title: "useHash",
  icon: Grain,
  lazy: () => import("./UI"),
  data: {
    description: "使用 <location>.hash",
  },
};
