import { Dashboard } from "@material-ui/icons";

export default {
  path: "dashboard",
  title: "Dashboard",
  icon: Dashboard,
  lazy: () => import("./UI"),
  data: {
    description: `神龟虽寿，犹有竟时。
腾蛇乘雾，终为土灰。
老骥伏枥，志在千里。
烈士暮年，壮心不已。
盈缩之期，不但在天。
养怡之福，可得永年。
幸甚至哉，歌以咏志。`,
  },
};
