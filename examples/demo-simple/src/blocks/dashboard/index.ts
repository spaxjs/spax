export default {
  path: "dashboard",
  title: "Dashboard",
  lazy: () => import("./UI"),
  data: {
    description: "Welcome to Dashboard.",
  },
  blocks: [
    // 404
    {
      path: "*",
      lazy: () => import("components/exception/NotFound"),
      data: {
        from: "dashboard",
      },
    },
  ],
};
