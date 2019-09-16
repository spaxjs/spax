import { IBlock, IPlugin, IPO, ISlots, useParsed } from "@spax/core";
import { MatchedChildBockOrChildren, Switch } from "@spax/router";
import React from "react";

export default {
  name: "Router",
  deps: ["Lazy", "Level", "Path"],
  plug: ({ parse, render }: ISlots, option: IPO) => {
    parse.tap((current: IBlock) => {
      return {
        ...current,
        ...normalizeComponent(current),
      };
    });

    render.tap(
      (blocks: IBlock[]): React.ReactElement => {
        return <Wrapper option={option} />;
      },
    );
  },
} as IPlugin;

function Wrapper({ option: { NotFound } }: any) {
  const [blocks] = useParsed();

  return (
    <Switch
      level={1}
      blocks={blocks}
      loose={false}
      NotFound={NotFound}
    />
  );
}

/**
 * 如果未指定 component，
 * 则将其设置为只显示子路由的“容器”。
 * 同时，设置 empty 属性，
 * 标识输入的 component 属性是否为空。
 */
function normalizeComponent(current: IBlock) {
  const {
    path,
    level,
    data = {},
    component,
    blocks = [],
  } = current;
  const empty = component === undefined;
  return {
    key: `${path}&${level}`,
    empty,
    data,
    component: empty ? MatchedChildBockOrChildren : component,
    blocks,
  };
}
