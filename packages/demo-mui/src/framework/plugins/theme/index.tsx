import { IHooks, IPO } from "@spax/core";
import React, { ReactElement } from "react";
import { Root } from "./Root";

export default ({ render }: IHooks) => {
  render.tap(
    "Theme",
    ["Router"],
    (element: ReactElement, option: IPO): ReactElement => {
      return <Root option={option}>{element}</Root>;
    },
  );
};
