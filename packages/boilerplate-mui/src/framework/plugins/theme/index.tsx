import { ICH, IPO } from "@spax/core";
import React, { ReactElement } from "react";
import { Root } from "./Root";

export default ({ render }: ICH) => {
  render.tap(
    "Theme",
    (modules: ReactElement, option: IPO): ReactElement => {
      return (
        <Root
          option={option}
        >{modules}</Root>
      );
    },
  );
};
