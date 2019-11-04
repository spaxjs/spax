import { IHooks, IPlugin } from "@spax/core";
import React, { StrictMode } from "react";

export default {
  name: "Strict",
  plug: ({ render }: IHooks) => {
    render.tap(
      (element: React.ReactNode): React.ReactNode => {
        return <StrictMode>{element}</StrictMode>;
      },
    );
  },
} as IPlugin;
