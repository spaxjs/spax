import { IModule, useParsed } from "@wugui/core";
import { useGlobalState } from "@wugui/hooks";
import { Link, useMatched } from "@wugui/plugin-router";
import { debug } from "@wugui/utils";
import { Icon, Menu as AntMenu } from "antd";
import React, { ReactNode } from "react";

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

  return (
    <AntMenu
      mode="inline"
      defaultOpenKeys={paths.slice(0, -1)}
      defaultSelectedKeys={paths.slice(paths.length - 1)}
      {...props}
      >{createMenuItems(menu, paths)}</AntMenu>
  );
}

function createMenuItems(menu: any[], paths: string[]): ReactNode[] {
  return menu.map(({ title, icon = "minus", path, empty, children }) => {
    if (children) {
      return (
        <AntMenu.SubMenu
          key={path}
          title={
            empty ? <>
              <Icon type={icon} />
              <span>{title}</span>
            </> : <Link to={path}>
              <Icon type={icon} />
              <span>{title}</span>
            </Link>
         }
          onTitleClick={(e) => {
            if (empty) {
              e.domEvent.preventDefault();
            }
          }}
          >
          {createMenuItems(children, paths)}
        </AntMenu.SubMenu>
      );
    }
    return (
      <AntMenu.Item key={path}>
        <Link to={path}>
          <Icon type={icon} />
          <span>{title}</span>
        </Link>
      </AntMenu.Item>
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
    .map(({ path, title, icon, empty, modules: childModules }) => {
      return {
        title,
        icon,
        path,
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
