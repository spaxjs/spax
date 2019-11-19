import FrameworkSimple from "@spax/framework-simple";
import React from "react";
import BuggyCounter from "../BuggyCounter";
import ErrorBoundary from "../ErrorBoundary";
import LocalCounter from "../LocalCounter";

const UI: React.FC<any> = (props: any) => {
  return (
    <div style={{ marginTop: "100px" }}>
      This was rendered by app 3, which is written in SPAX.
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <LocalCounter />
    </div>
  );
};

export default new FrameworkSimple().createApp([{ path: "*", component: UI }]);
