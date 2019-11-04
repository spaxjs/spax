import { IBlock, IHooks, IOption, IPlugin } from "@spax/core";
import { log } from "@spax/debug";
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
  inGreedy?: boolean,
) {
  const { path, greedy } = props;

  return (
    <Route
      key={path}
      path={path}
      render={({ match }: RouteComponentProps) => {
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
            log("Matching `%s` greedily", path);
          }
          return (
            <C
              {...props}
              {...data}
              match={{
                ...match,
                inGreedy,
              }}
            >
              {createRoutes(blocks, NotFound, true)}
            </C>
          );
        }

        if (match.isExact) {
          if (process.env.NODE_ENV === "development") {
            log("Matching `%s` exactly", path);
          }
          return <C
            {...props}
            {...data}
            match={{
              ...match,
              inGreedy,
            }}
          />;
        }

        if (hasChild) {
          return createRoutes(blocks, NotFound, inGreedy);
        }

        if (path) {
          if (process.env.NODE_ENV === "development") {
            log("No Matching for `%s`, use NotFound instead", path);
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
  inGreedy?: boolean,
): React.ReactNode {
  if (!blocks) {
    return null;
  }
  return (<Switch>
    {
      blocks.map((block: IBlock) => createRoute(block, NotFound, inGreedy))
    }
  </Switch>);
}
