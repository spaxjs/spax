import { IHooks, TPlugin } from "@spax/core";
import React, { StrictMode } from "react";

export default [
  "Strict",
  [],
  ({ render }: IHooks) => {
    render.tap(
      (element: React.ReactNode): React.ReactNode => {
        return <StrictMode>{element}</StrictMode>;
      },
    );
  },
] as TPlugin;
