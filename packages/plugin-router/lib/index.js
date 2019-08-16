import { Carrier, Router, Switch } from "@spax/router";
import React from "react";
export default ({ parse, render }) => {
    parse.tap("Router", (current, parent, option) => {
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
    render.tap("Router", (modules, option, { scope }) => {
        // 向后传
        Object.assign(option, { modules });
        return (React.createElement(Switch, { level: 1, modules: modules, scope: scope, loose: false, useAuth: option.useAuth, NotFound: option.NotFound, Forbidden: option.Forbidden }));
    }, (element, option, { scope }) => {
        return (React.createElement(Router, { scope: scope, modules: option.modules }, element));
    }, ["Path"]);
};
/**
 * 如果未指定 component，
 * 则将其设置为只显示子路由的“容器”。
 * 同时，设置 empty 属性，
 * 标识输入的 component 属性是否为空。
 */
function normalizeComponent(current, option) {
    const { path, level, authority = [], data = {}, component, modules = [] } = current;
    const empty = component === undefined;
    return {
        key: `${path}&${level}`,
        empty,
        authority,
        data,
        component: empty ? Carrier : component,
        modules,
    };
}
