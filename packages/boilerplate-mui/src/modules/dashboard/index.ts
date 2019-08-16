import { Dashboard } from "@material-ui/icons";

export default {
  path: "dashboard",
  title: "Dashboard",
  icon: Dashboard,
  lazy: () => import("./UI"),
  data: {
    description: "dashboard.cc-poetry",
  },
};
