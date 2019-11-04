import { IBlock } from "@spax/core";
import { log } from "@spax/debug";
import { useContext } from "@spax/framework";
import React from "react";
import { match as routerMatch, matchPath, useLocation } from "react-router-dom";

interface IMenuData {
  matched: [routerMatch, IBlock][];
  all: IMenu[];
}

interface IMenu {
  title: string;
  icon: React.ReactNode;
  path: string;
  match: routerMatch;
  children?: IMenu[];
}

const Context = React.createContext(null);

export const useLayout = () => {
  return React.useContext(Context);
};

export const LayoutProvider = (props: any) => {
  const { pathname } = useLocation();
  const { parsed } = useContext();
  const menuData = React.useMemo(() => {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
      log("Generating menu of: %O", parsed);
    }
    return getMenuData(pathname, parsed, []);
  }, [pathname, parsed]);
  const [state, setState] = React.useState({});

  return (
    <Context.Provider value={{
      ...menuData, ...state, setState: (v: any) => {
        setState({ ...state, ...v });
      },
    }}>
      {props.children}
    </Context.Provider>
  );
};

/**
 * 获取需要显示的菜单树结构
 */
function getMenuData(
  pathname: string,
  blocks: IBlock[],
  matched: [routerMatch, IBlock][],
): IMenuData {
  return {
    matched,
    all: blocks
      // 非 404
      // 有标题
      .filter(
        ({ path, title }) =>
          path.indexOf("*") === -1 && !!title,
      )
      .map(({ blocks: childBlocks, ...rest }) => {
        const match = matchPath(pathname, { path: rest.path });
        if (match) {
          matched.push([match, rest]);
        }
        return {
          ...rest,
          match,
          children:
            childBlocks && childBlocks.length
              ? getMenuData(pathname, childBlocks, matched).all
              : undefined,
        };
      })
      .flat(),
  };
}
