import { DeviceHub } from "@material-ui/icons";
import UI from "./UI";

export default {
  path: "hooks",
  title: "Hooks",
  icon: DeviceHub,
  description: "一些有用的 React Hooks",
  component: UI,
  greedy: true,
  blocks: [
    import("./global"),
  ],
};
