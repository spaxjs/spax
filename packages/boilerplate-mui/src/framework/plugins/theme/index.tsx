import { ICH, ICO, IPO } from "@spax/core";
import { addRes } from "@spax/i18n";
import React, { ReactElement } from "react";
import { Root } from "./Root";

export default ({ init, render }: ICH) => {
  init.tap(
    "Theme",
    (option: IPO, options: ICO) => {
      addRes({
        "en": {
          "slogan": "Maintaining the status quo",
          "with heart": "Made with ❤ in China",
        },
        "zh": {
          "slogan": "以不变应万变",
          "with heart": "用 ❤ 在中国制造",
        },
      }, "Theme");
    },
    undefined,
    ["I18n"],
  );

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
