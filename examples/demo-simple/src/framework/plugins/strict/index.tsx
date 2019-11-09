import { IHooks, IPlugin } from "@spax/core";
import React from "react";

export default {
  name: "Strict",
  plug: ({ render }: IHooks) => {
    render.tap(
      (element: React.ReactNode): React.ReactNode => {
        return <React.StrictMode>{element}</React.StrictMode>;
      },
    );
  },
} as IPlugin;
