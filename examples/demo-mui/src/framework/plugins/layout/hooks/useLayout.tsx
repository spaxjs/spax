import { IBlock, useParsed } from "@spax/core";
import { debug } from "@spax/debug";
import { useGlobalState } from "@spax/hooks";
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
  const [role] = useGlobalState<string>("role");
  const [blocks] = useParsed();
  const value = React.useMemo(() => {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
      debug("Generating menu for %s with: %O", role, blocks);
    }
    return getMenuData(pathname, role, blocks, []);
  }, [pathname, role, blocks]);
  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

/**
 * 获取需要显示的菜单树结构
 */
function getMenuData(
  pathname: string,
  role: string,
  blocks: IBlock[],
  matched: [routerMatch, IBlock][],
): IMenuData {
  return {
    matched,
    all: blocks
      // 非 404
      // 有标题
      // 有权限
      .filter(
        ({ path, title, authority }) =>
          path.indexOf("*") === -1 && !!title && hasAuth(role, authority),
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
              ? getMenuData(pathname, role, childBlocks, matched).all
              : undefined,
        };
      })
      .flat(),
  };
}

function hasAuth(role: string, authority: string[]) {
  if (!authority || authority.length === 0) {
    return true;
  }
  if (!role) {
    return false;
  }
  return authority.indexOf(role) !== -1;
}
