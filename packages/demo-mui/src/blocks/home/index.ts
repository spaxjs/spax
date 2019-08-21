import UI from "./UI";

/**
 * 首页，`path` 不填，默认为 `/`
 */
export default {
  layout: "blank",
  authority: ["admin"],
  component: UI,
  data: {
    title: "Hello World",
  },
};
