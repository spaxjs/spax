import { ICH, IMD, IPO } from "@wugui/core";
import { ChildRoutes, Router, Switch } from "@wugui/router";
import React, { ReactElement } from "react";

export default ({ parse, render }: ICH) => {
  parse.tap("Router", (current: IMD, parent: IMD, option: IPO) => {
    return {
      ...current,
      ...normalizeComponent(current, option),
    };
  }, undefined, ["Loadable", "level"]);

  /**
   * @example
   * <Router>
   *   <...>
   *     <Switch>
   */
  render.tap(
    "Router",
    (modules: IMD[], option: IPO): ReactElement => {
      // 不传入 modules，而是直接去 core 取
      return (
        <Switch
          level={1}
          option={option}
        />
      );
    },
    (element: ReactElement, option: IPO): ReactElement => {
      return (
        <Router
          option={option}
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
function normalizeComponent(current: IMD, option: IPO) {
  const { path, level, authority = [], data = {}, component, modules = [] } = current;
  const empty = component === undefined;
  return {
    key: `${path}&${level}`,
    empty,
    authority,
    data,
    component: empty ? ChildRoutes : component,
    modules,
  };
}
