import { useParsed } from "@spax/core";
import { MatchedChildBockOrChildren, Switch } from "@spax/router";
import React from "react";
export default [
    "Router",
    ["Lazy", "Level", "Path"],
    ({ parse, render }, option) => {
        parse.tap((current, parent) => {
            return {
                ...current,
                ...normalizeComponent(current, option),
            };
        });
        render.tap((blocks) => {
            return React.createElement(Wrapper, { option: option });
        });
    },
];
function Wrapper({ option: { useAuth, NotFound, Forbidden } }) {
    const [blocks] = useParsed();
    return (React.createElement(Switch, { level: 1, blocks: blocks, loose: false, useAuth: useAuth, NotFound: NotFound, Forbidden: Forbidden }));
}
/**
 * 如果未指定 component，
 * 则将其设置为只显示子路由的“容器”。
 * 同时，设置 empty 属性，
 * 标识输入的 component 属性是否为空。
 */
function normalizeComponent(current, option) {
    const { path, level, authority = [], data = {}, component, blocks = [], } = current;
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
