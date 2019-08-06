import Framework from "framework";
import * as serviceWorker from "serviceWorker";

new Framework({
  modules: [
    import("modules/login"),
    import("modules/register"),
    import("modules/forgot"),
    import("modules/home"),
    import("modules/dashboard"),
    import("modules/hooks"),
    import("modules/nested"),
    // import("modules/todo"),
    // import("modules/grid"),
    // import("modules/grid2"),
    // import("modules/group"),
    // 404
    {
      path: "*",
      layout: "blank",
      lazy: () => import("components/exception/NotFound"),
    },
  ],
}).mount();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
