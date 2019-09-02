import { IBlock, IHooks, IPO, TPlugin, useParsed } from "@spax/core";
import { MatchedChildBockOrChildren, Switch } from "@spax/router";
import React, { ReactElement } from "react";

export default [
  "Router",
  ["Lazy", "Level", "Path"],
  ({ parse, render }: IHooks, option: IPO) => {
    parse.tap((current: IBlock, parent: IBlock) => {
      return {
        ...current,
        ...normalizeComponent(current, option),
      };
    });

    render.tap(
      (blocks: IBlock[]): ReactElement => {
        return <Wrapper option={option} />;
      },
    );
  },
] as TPlugin;

function Wrapper({ option: { useAuth, NotFound, Forbidden } }: any) {
  const [blocks] = useParsed();

  return (
    <Switch
      level={1}
      blocks={blocks}
      loose={false}
      useAuth={useAuth}
      NotFound={NotFound}
      Forbidden={Forbidden}
    />
  );
}

/**
 * 如果未指定 component，
 * 则将其设置为只显示子路由的“容器”。
 * 同时，设置 empty 属性，
 * 标识输入的 component 属性是否为空。
 */
function normalizeComponent(current: IBlock, option: IPO) {
  const {
    path,
    level,
    authority = [],
    data = {},
    component,
    blocks = [],
  } = current;
  const empty = component === undefined;
  return {
    key: `${path}&${level}`,
    empty,
    authority,
    data,
    component: empty ? MatchedChildBockOrChildren : component,
    blocks,
  };
}
