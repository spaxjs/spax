import { IBlock, IPlugin, IPO, ISlots } from "@spax/core";
import React from "react";
import { DocumentTitle } from "./components/DocumentTitle";
import { LayoutProvider } from "./hooks/useLayout";

export default {
  name: "Layout",
  deps: ["Level"],
  plug: ({ parse, render }: ISlots, option: IPO) => {
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
  option: IPO,
): any {
  return {
    component: (props: any) => {
      if (props.isInGreedy) {
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
