import { IPlugin, ISlots } from "@spax/core";
import React, { StrictMode } from "react";

export default {
  name: "Strict",
  deps: [],
  plug: ({ render }: ISlots) => {
    render.tap(
      (element: React.ReactNode): React.ReactNode => {
        return <StrictMode>{element}</StrictMode>;
      },
    );
  },
} as IPlugin;
