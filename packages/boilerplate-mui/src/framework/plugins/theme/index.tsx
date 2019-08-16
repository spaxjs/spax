import { ICH, ICO, IPO } from "@spax/core";
import React, { ReactElement } from "react";
import { Root } from "./Root";

export default ({ render }: ICH) => {
  /**
   * <Router>
   *   <Root>
   *     <Switch>
   */
  render.tap(
    "Theme",
    (modules: ReactElement, option: IPO, options: ICO): ReactElement => {
      return (
        <Root
          option={option}
        >{modules}</Root>
      );
    },
    undefined,
    ["Router"],
  );
};
