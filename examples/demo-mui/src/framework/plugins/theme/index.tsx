import { IHooks, IPO, TPlugin } from "@spax/core";
import React, { ReactElement } from "react";
import { Root } from "./Root";

export default [
  "Theme",
  ["Router"],
  ({ render }: IHooks, option: IPO) => {
    render.tap(
      (element: ReactElement): ReactElement => {
        return <Root option={option}>{element}</Root>;
      },
    );
  },
] as TPlugin;
