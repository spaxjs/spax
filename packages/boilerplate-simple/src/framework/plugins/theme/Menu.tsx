import { IModule, useParsed } from "@wugui/core";
import { useGlobalState } from "@wugui/hooks";
import { Link, useMatched } from "@wugui/plugin-router";
import { debug } from "@wugui/utils";
import { Box, Collapsible } from "grommet";
import { Anchor } from "grommet-icons";
import React, { ReactElement, ReactNode, useState } from "react";

interface IMenu {
  title: string;
  icon: ReactNode;
  path: string;
  children?: IMenu[];
}

const cacheMap: Map<string, IMenu[]> = new Map();

export default function Menu(props: any) {
  const [auth] = useGlobalState<string>("auth");
  const [modules] = useParsed();
  const matched = useMatched();
  const menu = getMenu(auth, modules);
  const paths = matched.map(([{ path }]) => path);

  console.log(menu);
  return (
    <>
      {createMenuItems(menu, paths)}
    </>
  );
}

function MenuGroup(props: any): ReactElement {
  const [open, setOpen] = useState(false);
  const { key, title, icon = "minus", path, empty } = props;
  return (
    <>
    {
      empty ? <Box onClick={() => setOpen(!open)}>
        <Anchor />
        <span>{title}</span>
      </Box> : <Link to={path} onClick={() => setOpen(!open)}>
        <Anchor />
        <span>{title}</span>
      </Link>
    }
    <Collapsible
      key={key}
      open={open}
    >
      {props.children}
    </Collapsible>
  </>
  );
}

function createMenuItems(menu: any[], paths: string[]): ReactNode[] {
  return menu.map(({ key, title, icon = "minus", path, empty, children }) => {
    if (children) {
      return (
        <MenuGroup
          key={key}
          title={title}
          icon={icon}
          path={path}
          empty={empty}
        >
          {createMenuItems(children, paths)}
        </MenuGroup>
      );
    }
    // 没有子节点，直接显示
    return (
      <Box key={path}>
        <Link to={path}>
          <Anchor />
          <span>{title}</span>
        </Link>
      </Box>
    );
  });
}

/**
 * 获取需要显示的菜单树结构
 */
function getMenu(auth: string, modules: IModule[]): IMenu[] {
  if (!cacheMap.has(auth)) {
    const menuData = getMenuData(auth, modules);

    if (process.env.NODE_ENV !== "production")
      debug("Menu configuration created: %O", menuData);

    cacheMap.set(auth, menuData);
  }
  return cacheMap.get(auth);
}

function getMenuData(auth: string, modules: IModule[]): IMenu[] {
  return modules
    // 过滤掉 路径带变量 的模块
    // 过滤掉无 标题 的模块
    // 过滤掉无 权限 的模块
    .filter(({ path, title, authority }) => path.indexOf(":") === -1 && !!title && hasAuth(auth, authority))
    .map(({ key, path, title, icon, empty, modules: childModules }) => {
      return {
        key,
        path,
        title,
        icon,
        empty,
        children: childModules.length ? getMenuData(auth, childModules) : undefined,
      };
    })
    .flat();
}

function hasAuth(auth: string, authority: string[]) {
  if (authority.length === 0) {
    return true;
  }
  if (!auth) {
    return false;
  }
  return authority.indexOf(auth) !== -1;
}
