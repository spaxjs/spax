import { IBlock, IHooks, IOptions, IPO } from "@spax/core";
import { Carrier, Router, Switch } from "@spax/router";
import React, { ReactElement } from "react";

export default ({ parse, render }: IHooks) => {
  parse.tap("Router", (current: IBlock, parent: IBlock, option: IPO) => {
    return {
      ...current,
      ...normalizeComponent(current, option),
    };
  }, undefined, ["Lazy", "Level"]);

  /**
   * @example
   * <Router>
   *   <...>
   *     <Switch>
   */
  render.tap(
    "Router",
    (blocks: IBlock[], option: IPO, { scope }: IOptions): ReactElement => {
      // 向后传
      Object.assign(option, { blocks });
      return (
        <Switch
          level={1}
          blocks={blocks}
          scope={scope}
          loose={false}
          useAuth={option.useAuth}
          NotFound={option.NotFound}
          Forbidden={option.Forbidden}
        />
      );
    },
    (element: ReactElement, option: IPO, { scope }: IOptions): ReactElement => {
      return (
        <Router
          scope={scope}
          blocks={option.blocks}
        >
          {element}
        </Router>
      );
    },
    ["Path"],
  );
};

/**
 * 如果未指定 component，
 * 则将其设置为只显示子路由的“容器”。
 * 同时，设置 empty 属性，
 * 标识输入的 component 属性是否为空。
 */
function normalizeComponent(current: IBlock, option: IPO) {
  const { path, level, authority = [], data = {}, component, blocks = [] } = current;
  const empty = component === undefined;
  return {
    key: `${path}&${level}`,
    empty,
    authority,
    data,
    component: empty ? Carrier : component,
    blocks,
  };
}
