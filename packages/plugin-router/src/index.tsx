import { IBlock, IHooks, IOption, IPlugin } from "@spax/core";
import { group, groupEnd, log } from "@spax/debug";
import React from "react";
import { HashRouter, Route, RouteComponentProps, Switch } from "react-router-dom";

export default {
  name: "Router",
  deps: ["Path"],
  plug: (
    { render }: IHooks,
    { Router = HashRouter, NotFound }: IOption,
  ) => {
    render.tap(
      (blocks: IBlock[]): React.ReactNode => {
        return createRoutes(blocks, NotFound);
      },
      (element: React.ReactNode): React.ReactNode => {
        return <Router>{element}</Router>;
      },
    );
  },
} as IPlugin;

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function createRoute(
  {
    component: C,
    blocks,
    data,
    ...props
  }: IBlock,
  NotFound: any,
) {
  const { path } = props;

  const hasChild = blocks && blocks.length !== 0;

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    log("create Route for `%s`: %O", path);
  }

  return (
    <Route
      key={path}
      path={path}
      render={({ match }: RouteComponentProps) => {
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
          return <C
            {...props}
            {...data}
            match={match}
          >{hasChild ? createRoutes(blocks, NotFound) : null}</C>;
        }

        if (hasChild) {
          return createRoutes(blocks, NotFound);
        }

        if (path) {
          if (process.env.NODE_ENV === "development") {
            log("No Match for `%s`", path);
          }
          return <NotFound />;
        }

        return null;
      }}
    />
  );
}

function createRoutes(
  blocks: IBlock[],
  NotFound: any,
): React.ReactNode {
  if (!blocks || !blocks.length) {
    return null;
  }

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    group("PluginRouter.createRoutes");
  }

  const routes = blocks.map(
    (block: IBlock) => createRoute(block, NotFound),
  );

  const ReactNode = blocks.length === 1 ? routes : <Switch>{routes}</Switch>;

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    groupEnd();
  }

  return ReactNode;
}
