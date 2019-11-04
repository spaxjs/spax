import { IBlock, IHooks, IOption, IPlugin } from "@spax/core";
import React from "react";
import { DocumentTitle } from "./components/DocumentTitle";
import { LayoutProvider } from "./use/useLayout";

export default {
  name: "Layout",
  plug: ({ parse, render }: IHooks, option: IOption) => {
    parse.tap((current: IBlock): IBlock => {
      return {
        ...current,
        ...normalizeLayout(current, option),
      };
    });
    render.tap((element: React.ReactNode): React.ReactNode => {
      return (
        <LayoutProvider>
          <DocumentTitle fallback={option.siteTitle} />
          {element}
        </LayoutProvider>
      );
    });
  },
} as IPlugin;

function normalizeLayout(
  { layout, component: C }: IBlock,
  option: IOption,
): any {
  return {
    component: (props: any) => {
      if (props.match.inGreedy) {
        return (
          <C {...props} />
        );
      }

      const Layout = layout === "blank"
        ? require("./layouts/Blank").default
        : require("./layouts/Admin").default;

      return (
        <Layout option={option}>
          <C {...props} />
        </Layout>
      );
    },
  };
}
