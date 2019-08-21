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
import { AnyObject, IBlock, useParsed } from "@spax/core";
import { debug } from "@spax/debug";
import { useGlobalState } from "@spax/hooks";
import { useT } from "@spax/i18n";
import { Link, useMatched } from "@spax/router";
import clsx from "clsx";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";

interface IMenu {
  title: string;
  icon: ReactNode;
  path: string;
  children?: IMenu[];
}

const cacheMap: Map<string, IMenu[]> = new Map();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listGroup: {
      paddingLeft: theme.spacing(2),
    },
    listItemIcon: {
      minWidth: 32,
    },
    listItemActive: {
      fontWeight: "bold",
    },
  }),
);

export const Menu: React.FC<AnyObject> = (props: any) => {
  const [role] = useGlobalState<string>("role");
  const [blocks] = useParsed();
  const matched = useMatched();
  const menu = getMenu(role, blocks);
  const openedKeys = matched.map(([{ key }]) => key);

  return <MenuList menu={menu} openedKeys={openedKeys} />;
};

function MenuNest(props: any): ReactElement {
  const { title, icon: Icon = Remove, path, empty, opened } = props;
  const [open, setOpen] = useState(opened);
  const { listGroup, listItemIcon, listItemActive } = useStyles({});
  const Pointer = open ? ExpandLess : ExpandMore;
  const { t } = useT();

  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  return (
    <>
      <Link component={L} to={empty ? false : path}>
        <ListItem onClick={() => setOpen(!open)}>
          <ListItemIcon className={listItemIcon}>
            <Icon />
          </ListItemIcon>
          <ListItemText className={clsx(open && listItemActive)} disableTypography>
            {t(title)}
          </ListItemText>
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
  const { listItemIcon, listItemActive } = useStyles({});
  const { t } = useT();
  const { menu, openedKeys } = props;
  return (
    <List component="nav">
      {menu.map(
        ({ key, title, icon: Icon = Remove, path, empty, children }) => {
          const opened = openedKeys.indexOf(key) !== -1;
          if (children) {
            return (
              <MenuNest
                key={key}
                title={title}
                icon={Icon}
                path={path}
                empty={empty}
                opened={opened}
              >
                {/* 如果是非激活的，后代必然是非激活的，所以传空，节省资源 */}
                <MenuList menu={children} openedKeys={opened ? openedKeys : []} />
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
                <ListItemText className={clsx(opened && listItemActive)} disableTypography>
                  {t(title)}
                </ListItemText>
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
function getMenu(role: string, blocks: IBlock[]): IMenu[] {
  if (!cacheMap.has(role)) {
    const menuData = getMenuData(role, blocks);

    if (process.env.NODE_ENV === "development")
      debug("Menu configuration created: %O", menuData);

    cacheMap.set(role, menuData);
  }
  return cacheMap.get(role);
}

function getMenuData(role: string, blocks: IBlock[]): IMenu[] {
  return (
    blocks
      // 过滤掉 路径带变量 的模块
      // 过滤掉无 标题 的模块
      // 过滤掉无 权限 的模块
      .filter(
        ({ path, title, authority }) =>
          path.indexOf(":") === -1 && !!title && hasAuth(role, authority),
      )
      .map(({ key, path, title, icon, empty, blocks: childBlocks }) => {
        return {
          key,
          path,
          title,
          icon,
          empty,
          children: childBlocks.length
            ? getMenuData(role, childBlocks)
            : undefined,
        };
      })
      .flat()
  );
}

function hasAuth(role: string, authority: string[]) {
  if (authority.length === 0) {
    return true;
  }
  if (!role) {
    return false;
  }
  return authority.indexOf(role) !== -1;
}
