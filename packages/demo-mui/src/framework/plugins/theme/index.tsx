import { IHooks, IOptions, IPO } from "@spax/core";
import React, { ReactElement } from "react";
import { Root } from "./Root";

export default ({ render }: IHooks) => {
  /**
   * <Router>
   *   <Root>
   *     <Switch>
   */
  render.tap(
    "Theme",
    (blocks: ReactElement, option: IPO, options: IOptions): ReactElement => {
      return (
        <Root
          option={option}
        >{blocks}</Root>
      );
    },
    undefined,
    ["Router"],
  );
};
