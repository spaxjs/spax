import { ICH, IPO } from "@wugui/core";
import React, { ReactElement } from "react";
import Theme from "./Theme";

export default ({ render }: ICH) => {
  render.tap(
    "Theme",
    (modules: ReactElement, option: IPO): ReactElement => {
      return (
        <Theme
          option={option}
        >{modules}</Theme>
      );
    },
  );
};
