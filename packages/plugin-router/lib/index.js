import { group, groupEnd, log } from "@spax/debug";
import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
export default {
    name: "Router",
    deps: ["Path"],
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
function createRoute({ component: C, blocks, data, ...props }, NotFound) {
    const { path } = props;
    const hasChild = blocks && blocks.length !== 0;
    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
        log("create Route for `%s`: %O", path);
    }
    return (React.createElement(Route, { key: path, path: path, render: ({ match }) => {
            if (!match) {
                return null;
            }
            if (!C) {
                if (hasChild) {
                    return createRoutes(blocks, NotFound);
                }
                return null;
            }
            if (match.isExact) {
                if (process.env.NODE_ENV === "development") {
                    log("Matching `%s` exactly", path);
                }
                return React.createElement(C, Object.assign({}, props, data, { match: match }), hasChild ? createRoutes(blocks, NotFound) : null);
            }
            if (hasChild) {
                return createRoutes(blocks, NotFound);
            }
            if (path) {
                if (process.env.NODE_ENV === "development") {
                    log("No Match for `%s`", path);
                }
                return React.createElement(NotFound, null);
            }
            return null;
        } }));
}
function createRoutes(blocks, NotFound) {
    if (!blocks || !blocks.length) {
        return null;
    }
    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
        group("PluginRouter.createRoutes");
    }
    const routes = blocks.map((block) => createRoute(block, NotFound));
    const ReactNode = blocks.length === 1 ? routes : React.createElement(Switch, null, routes);
    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
        groupEnd();
    }
    return ReactNode;
}
