import { Dashboard } from "grommet-icons/icons";

export default {
  path: "dashboard",
  title: "Dashboard",
  icon: Dashboard,
  lazy: () => import("./UI"),
  data: {
    title: "Dashboard",
  },
};
