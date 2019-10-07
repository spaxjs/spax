import { debug } from "@spax/debug";
import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
export default {
    name: "Router",
    deps: [],
    plug: ({ render }, { Router = HashRouter, NotFound }) => {
        render.tap((blocks) => {
            return createRoutes(blocks, NotFound);
        }, (element) => {
            return React.createElement(Router, null, element);
        });
    },
};
// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function createRoute({ component: C, blocks, data, ...props }, NotFound, inGreedy) {
    const { path, greedy } = props;
    return (React.createElement(Route, { key: path, path: path, render: ({ match }) => {
            if (!match) {
                return null;
            }
            const hasChild = blocks && blocks.length !== 0;
            if (!C) {
                if (hasChild) {
                    return createRoutes(blocks, NotFound, inGreedy);
                }
                return null;
            }
            // 贪婪，有两种表现：
            // 该儿子时，父也想出现，所以把子组件交给父，让父来控制该如何显示；
            // 已经精确匹配了，还想继续向下匹配更多的子级。
            if (greedy) {
                if (process.env.NODE_ENV === "development") {
                    debug("Matching `%s` greedily", path);
                }
                return (React.createElement(C, Object.assign({}, props, data, { match: {
                        ...match,
                        inGreedy,
                    } }), createRoutes(blocks, NotFound, true)));
            }
            if (match.isExact) {
                if (process.env.NODE_ENV === "development") {
                    debug("Matching `%s` exactly", path);
                }
                return React.createElement(C, Object.assign({}, props, data, { match: {
                        ...match,
                        inGreedy,
                    } }));
            }
            if (hasChild) {
                return createRoutes(blocks, NotFound, inGreedy);
            }
            if (path) {
                if (process.env.NODE_ENV === "development") {
                    debug("No Matching for `%s`, use NotFound instead", path);
                }
                return React.createElement(NotFound, null);
            }
            return null;
        } }));
}
function createRoutes(blocks, NotFound, inGreedy) {
    if (!blocks) {
        return null;
    }
    return (React.createElement(Switch, null, blocks.map((block) => createRoute(block, NotFound, inGreedy))));
}
