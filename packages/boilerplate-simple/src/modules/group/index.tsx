/**
 * component 为空，则表现为空容器，只展示子路由的内容
 */
export default {
  path: "group",
  title: "Group",
  modules: [
    import("../grid"),
    import("../nest/modules/c1"),
    import("../nest/modules/c2"),
    // 404
    {
      path: "*",
      lazy: () => import("../nest/components/NotFound"),
    },
  ],
};
