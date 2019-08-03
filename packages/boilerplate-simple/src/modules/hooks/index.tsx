// import UI from "./UI";

export default {
  path: "hooks",
  title: "Hooks",
  icon: "link",
  description: "一些有用的 React Hooks",
  // component: UI,
  modules: [
    import("./persist"),
    import("./global"),
  ],
};
