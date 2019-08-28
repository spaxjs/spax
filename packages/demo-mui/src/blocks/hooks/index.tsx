import { DeviceHub } from "@material-ui/icons";
import UI from "./UI";

export default {
  path: "hooks",
  title: "Hooks",
  icon: DeviceHub,
  description: "一些有用的 React Hooks",
  component: UI,
  blocks: [
    import("./global"),
    import("./search"),
    import("./hash"),
  ],
};
