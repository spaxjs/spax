import { usePathname } from "@spax/history";
import pathToRegexp from "path-to-regexp";
import React from "react";
import { useBlocks } from "./hooks";
import { getMatched } from "./utils";
export const Router = ({ children, scope, blocks }) => {
    const [pathname] = usePathname();
    // 为了外部能够第一时间获得匹配到的顶级模块
    const matchedState = getMatched(scope, pathname, 1, blocks);
    return matchedState ? children : null;
};
export const Switch = ({ level, blocks, scope, loose = false, useAuth = () => true, Pending = () => null, NotFound = () => null, Forbidden = () => null, children = null, }) => {
    const [pathname] = usePathname();
    const matchedState = getMatched(scope, pathname, level, blocks, loose);
    const authed = useAuth(matchedState ? matchedState[0] : undefined);
    if (matchedState) {
        if (authed) {
            // tslint:disable-next-line: no-shadowed-variable
            const { component: Matched, data } = matchedState[0];
            return (React.createElement(Matched, Object.assign({}, data, matchedState[1], { "$$block": matchedState[0], "$$scope": scope, "$$useAuth": useAuth, "$$NotFound": NotFound, "$$Forbidden": Forbidden })));
        }
        // pending
        if (authed === undefined) {
            return React.createElement(Pending, null);
        }
        return React.createElement(Forbidden, null);
    }
    // 宽松模式，不显示 404
    if (loose) {
        return children;
    }
    return React.createElement(NotFound, null);
};
export const Carrier = ({ children = null, ...props }) => {
    const MatchedChild = useBlocks(props);
    return React.createElement(MatchedChild, null, children);
};
/**
 * @example
 * <Link to="/login?rv=1">Login</Link>
 * <Link to={{pathname: "/login", search: {rv: 1}}}>Login</Link>
 * // <a href="/#/login?rv=1">Login</a>
 */
export const Link = ({ children, to, as: As, component: Cp, ...props }) => {
    if (typeof to === "boolean") {
        return React.createElement("a", Object.assign({}, props), children);
    }
    if (typeof to === "string") {
        to = {
            pathname: to,
        };
    }
    if (!to.pathname) {
        to.pathname = "/";
    }
    else if (to.pathname.charAt(0) !== "/") {
        to.pathname = `/${to.pathname}`;
    }
    const url = pathToRegexp.compile(to.pathname)(to.params || {});
    return (As
        ? React.createElement(As, Object.assign({}, props, { href: `/#${url}` }), children)
        : Cp
            ? React.createElement(Cp, Object.assign({}, props, { href: `/#${url}` }), children)
            : React.createElement("a", Object.assign({}, props, { href: `/#${url}` }), children));
};
