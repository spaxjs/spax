import { IHooks, IOptions, IPO } from "@spax/core";
import React, { ReactElement } from "react";
import { Root } from "./Root";

export default ({ render }: IHooks) => {
  render.tap(
    "Theme",
    ["Router"],
    (element: ReactElement, option: IPO, options: IOptions): ReactElement => {
      return (
        <Root
          option={option}
        >{element}</Root>
      );
    },
  );
};
