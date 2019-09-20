import { compile } from "path-to-regexp";
import React from "react";
import { useMatchedBlockAndParams, useMatchedFromChildBocks } from "./hooks";
import { ComponentProps, LinkProps, SwitchProps } from "./types";

export const Switch: React.FC<SwitchProps> = ({
  level,
  blocks,
  loose = false,
  NotFound = () => null,
  children = null,
}: SwitchProps): any => {
  const matchedState = useMatchedBlockAndParams(level, blocks, loose);

  if (matchedState) {
    const { component: Comp, data } = matchedState[0];
    return (
      <Comp
        {...data}
        {...matchedState[1]}
        $$block={matchedState[0]}
        $$NotFound={NotFound}
      />
    );
  }

  // 宽松模式，不显示 404
  if (loose) {
    return children;
  }

  return <NotFound />;
};

export const MatchedChildBockOrChildren: React.FC<ComponentProps> = ({children = null, ...props}: ComponentProps) => {
  const MatchedChild = useMatchedFromChildBocks(props);
  return <MatchedChild>{children}</MatchedChild>;
};

/**
 * @example
 * <Link to="/login?rv=1">Login</Link>
 * <Link to={{pathname: "/login", search: {rv: 1}}}>Login</Link>
 * // <a href="/#/login?rv=1">Login</a>
 */
export const Link: React.FC<LinkProps> = ({children, to, as: As, component: Cp, ...props}: LinkProps) => {
  if (typeof to === "boolean") {
    return <a {...props}>{children}</a>;
  }
  if (typeof to === "string") {
    to = {
      pathname: to,
    };
  }
  if (!to.pathname) {
    to.pathname = "/";
  } else if (to.pathname.charAt(0) !== "/") {
    to.pathname = `/${to.pathname}`;
  }
  const url = compile(to.pathname)(to.params || {});
  return (
    As
    ? <As {...props} href={`/#${url}`}>{children}</As>
    : Cp
    ? <Cp {...props} href={`/#${url}`}>{children}</Cp>
    : <a {...props} href={`/#${url}`}>{children}</a>
  );
};
