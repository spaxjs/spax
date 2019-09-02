import * as singleSpa from "single-spa";

singleSpa.registerApplication("app-1", () =>
  import ("./app1/app1.js"), pathPrefix("/app1"));
singleSpa.registerApplication("app-2", () =>
  import ("./app2/app2"), pathPrefix("/app2"));
singleSpa.registerApplication("app-3", () =>
  import ("./app3/app3"), pathPrefix("/app3"));

singleSpa.start();

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(`${prefix}`);
  };
}
