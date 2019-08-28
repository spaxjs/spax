import { IHooks } from "@spax/core";
import React, { ReactElement, StrictMode } from "react";

export default ({ render }: IHooks) => {
  render.tap(
    "Strict",
    [],
    (element: ReactElement): ReactElement => {
      return <StrictMode>{element}</StrictMode>;
    },
  );
};
