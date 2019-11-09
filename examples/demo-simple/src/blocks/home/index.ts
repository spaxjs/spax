import UI from "./UI";

export default {
  component: UI,
  data: {
    title: "Hello World",
  },
  blocks: [
    // 404
    {
      path: "*",
      lazy: () => import("components/exception/NotFound"),
    },
  ],
};
