import { ICoreHooks, IPluginOption } from "@wugui/core";
import React, { ReactElement } from "react";
import Theme from "./Theme";

export default ({ render }: ICoreHooks) => {
  render.tap(
    "Theme",
    (modules: ReactElement, option: IPluginOption): ReactElement => {
      return (
        <Theme
          option={option}
        >{modules}</Theme>
      );
    },
  );
};
