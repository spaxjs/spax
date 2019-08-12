import pathToRegexp from "path-to-regexp";
import React from "react";
import { LinkProps } from "./types";

/**
 * @example
 * <Link to="/login?rv=1">Login</Link>
 * <Link to={{pathname: "/login", search: {rv: 1}}}>Login</Link>
 * // <a href="/#/login?rv=1">Login</a>
 */
export default function Link({children, to, as: As, component: Cp, ...props}: LinkProps) {
  if (typeof to === "string") {
    to = {
      pathname: to,
    };
  }
  if (typeof to === "boolean") {
    return <a {...props}>{children}</a>;
  }
  const url = pathToRegexp.compile(to.pathname)(to.params || {});
  return (
    As
    ? <As {...props} href={`/#${url}`}>{children}</As>
    : Cp
    ? <Cp {...props} href={`/#${url}`}>{children}</Cp>
    : <a {...props} href={`/#${url}`}>{children}</a>
  );
}
