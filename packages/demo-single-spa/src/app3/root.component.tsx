import FrameworkHook from "@spax/framework-hook";
import React from "react";
import BuggyCounter from "../BuggyCounter";
import ErrorBoundary from "../ErrorBoundary";
import GlobalCounter from "../GlobalCounter";

const UI: React.FC<any> = (props: any) => {
  return (
    <div style={{ marginTop: "100px" }}>
      This was rendered by app 3, which is written in SPAX.
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <GlobalCounter />
    </div>
  );
};

export default new FrameworkHook({
  blocks: [{ path: "*", component: UI }],
}).render();
