import { IHooks, TPlugin } from "@spax/core";
import React, { ReactElement, StrictMode } from "react";

export default [
  "Strict",
  [],
  ({ render }: IHooks) => {
    render.tap(
      (element: ReactElement): ReactElement => {
        return <StrictMode>{element}</StrictMode>;
      },
    );
  },
] as TPlugin;
