import { ICoreHooks, IPluginOption } from "@wugui/core";
import React, { ReactElement } from "react";
import Root from "./Root";

export default ({ render }: ICoreHooks) => {
  render.tap(
    "Theme",
    (modules: ReactElement, option: IPluginOption): ReactElement => {
      return (
        <Root
          option={option}
        >{modules}</Root>
      );
    },
  );
};
