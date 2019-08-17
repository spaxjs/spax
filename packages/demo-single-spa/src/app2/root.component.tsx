import FrameworkHook from "@spax/framework-hook";
import React from "react";

const UI: React.FC<any> = (props: any) => {
  return (
    <div style={{ marginTop: "100px" }}>
      This was rendered by app 2, which is written in SPAX.
    </div>
  );
};

export default new FrameworkHook({
  scope: "app2",
  modules: [{ path: "*", component: UI }],
}).render();
