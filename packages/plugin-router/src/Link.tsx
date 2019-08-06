import { AnyObject } from "@wugui/core";
import pathToRegexp from "path-to-regexp";
import React, { ReactNode } from "react";

interface LinkProps extends AnyObject {
  to: string | {
    pathname: string;
    params?: AnyObject;
    search?: AnyObject;
    hash?: AnyObject;
  };
  as?: any;
  children: ReactNode;
}

/**
 * @example
 * <Link to="/login?rv=1">Login</Link>
 * <Link to={{pathname: "/login", search: {rv: 1}}}>Login</Link>
 * // <a href="/#/login?rv=1">Login</a>
 */
export default function Link({children, to, as: As, ...props}: LinkProps) {
  if (typeof to === "string") {
    to = {
      pathname: to,
    };
  }
  const url = pathToRegexp.compile(to.pathname)(to.params || {});
  return (
    As
    ? <As {...props} href={`/#${url}`}>{children}</As>
    : <a {...props} href={`/#${url}`}>{children}</a>
  );
}
