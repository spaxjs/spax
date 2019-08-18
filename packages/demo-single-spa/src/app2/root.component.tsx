import FrameworkHook from "@spax/framework-hook";
import React from "react";
import BuggyCounter from "../BuggyCounter";
import ErrorBoundary from "../ErrorBoundary";

const UI: React.FC<any> = (props: any) => {
  return (
    <div style={{ marginTop: "100px" }}>
      This was rendered by app 2, which is written in SPAX.
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  );
};

export default new FrameworkHook({
  scope: "app2",
  modules: [{ path: "*", component: UI }],
}).render();
