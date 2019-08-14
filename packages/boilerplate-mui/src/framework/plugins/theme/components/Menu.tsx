import {
  Collapse,
  Link as L,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Remove } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AnyObject, IMD, useParsed } from "@wugui/core";
import { debug } from "@wugui/debug";
import { useGlobalState } from "@wugui/hooks";
import { Link, useMatched } from "@wugui/router";
import React, { ReactElement, ReactNode, useState } from "react";

interface IMenu {
  title: string;
  icon: ReactNode;
  path: string;
  children?: IMenu[];
}

const cacheMap: Map<string, IMenu[]> = new Map();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {},
    listGroup: {
      paddingLeft: theme.spacing(2),
    },
    listItemIcon: {
      minWidth: 32,
    },
  }),
);

export const Menu: React.FC<AnyObject> = (props: any) => {
  const [auth] = useGlobalState<string>("auth");
  const [modules] = useParsed();
  const matched = useMatched();
  const menu = getMenu(auth, modules);
  const paths = matched.map(([{ path }]) => path);

  return <MenuList menu={menu} paths={paths} />;
};

function MenuNest(props: any): ReactElement {
  const { title, icon: Icon = Remove, path, empty, opened } = props;
  const [open, setOpen] = useState(opened);
  const { listGroup, listItemIcon } = useStyles({});
  const Pointer = open ? ExpandLess : ExpandMore;
  return (
    <>
      <Link component={L} to={empty ? false : path}>
        <ListItem onClick={() => setOpen(!open)}>
          <ListItemIcon className={listItemIcon}>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={title} />
          <Pointer />
        </ListItem>
      </Link>
      <Collapse className={listGroup} in={open}>
        {props.children}
      </Collapse>
    </>
  );
}

function MenuList(props: any): ReactElement {
  const { list, listItemIcon } = useStyles({});
  const { menu, paths } = props;
  return (
    <List className={list} component="nav">
      {menu.map(
        ({ key, title, icon: Icon = Remove, path, empty, children }) => {
          if (children) {
            return (
              <MenuNest
                key={key}
                title={title}
                icon={Icon}
                path={path}
                empty={empty}
                opened={paths.indexOf(path) !== -1}
              >
                <MenuList menu={children} paths={paths} />
              </MenuNest>
            );
          }
          // 没有子节点，直接显示
          return (
            <Link component={L} key={key} to={path}>
              <ListItem>
                <ListItemIcon className={listItemIcon}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            </Link>
          );
        },
      )}
    </List>
  );
}

/**
 * 获取需要显示的菜单树结构
 */
function getMenu(auth: string, modules: IMD[]): IMenu[] {
  if (!cacheMap.has(auth)) {
    const menuData = getMenuData(auth, modules);

    if (process.env.NODE_ENV === "development")
      debug("Menu configuration created: %O", menuData);

    cacheMap.set(auth, menuData);
  }
  return cacheMap.get(auth);
}

function getMenuData(auth: string, modules: IMD[]): IMenu[] {
  return (
    modules
      // 过滤掉 路径带变量 的模块
      // 过滤掉无 标题 的模块
      // 过滤掉无 权限 的模块
      .filter(
        ({ path, title, authority }) =>
          path.indexOf(":") === -1 && !!title && hasAuth(auth, authority),
      )
      .map(({ key, path, title, icon, empty, modules: childModules }) => {
        return {
          key,
          path,
          title,
          icon,
          empty,
          children: childModules.length
            ? getMenuData(auth, childModules)
            : undefined,
        };
      })
      .flat()
  );
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
