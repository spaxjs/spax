import { IHooks, IPlugin } from "@spax/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

export default {
  name: "Window",
  plug: ({ render }: IHooks) => {
    render.tap(
      (element: React.ReactNode): React.ReactNode => {
        return <Window>{element}</Window>;
      },
    );
  },
} as IPlugin;

function Window(props: any) {
  const { goBack } = useHistory();
  const { pathname } = useLocation();
  return (
    <div>
      <p>
        <button onClick={goBack}>goBack</button>
        <span style={{ marginLeft: 5 }}>{pathname}</span>
      </p>
      {props.children}
    </div>
  );
}
