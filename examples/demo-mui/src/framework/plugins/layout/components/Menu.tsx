import {
  Collapse,
  createStyles,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Remove } from "@material-ui/icons";
import { ObjectOf } from "@spax/core";
import { useT } from "@spax/i18n";
import clsx from "clsx";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useLayout } from "../use/useLayout";

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

export const Menu: React.FC<ObjectOf> = (props: ObjectOf) => {
  const { all } = useLayout();

  return <MenuList menuData={all} />;
};

function MenuNest(props: any): React.ReactElement {
  const { title, icon: Icon = Remove, path, empty, opened } = props;
  const {open = false, setState} = useLayout();
  const { listGroup, listItemIcon, listItemActive } = useStyles({});
  const Pointer = open ? ExpandLess : ExpandMore;
  const [t] = useT();

  React.useEffect(() => {
    setState({ open: opened });
  }, [opened, setState]);

  return (
    <>
      <Link component={RouterLink} to={empty ? false : path}>
        <ListItem onClick={() => setState({ open: !open })}>
          <ListItemIcon className={listItemIcon}>
            <Icon />
          </ListItemIcon>
          <ListItemText
            className={clsx(open && listItemActive)}
            disableTypography
          >
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

function MenuList(props: any): React.ReactElement {
  const { listItemIcon, listItemActive } = useStyles({});
  const [t] = useT();
  const { menuData } = props;
  return (
    <List component="nav">
      {menuData.map(
        ({
          title,
          icon: Icon = Remove,
          path,
          empty,
          match,
          children,
        }) => {
          if (children) {
            return (
              <MenuNest
                key={path}
                title={title}
                icon={Icon}
                path={path}
                empty={empty}
                opened={Boolean(match)}
              >
                {/* 如果是非激活的，后代必然是非激活的，所以传空，节省资源 */}
                <MenuList
                  menuData={children}
                />
              </MenuNest>
            );
          }
          // 没有子节点，直接显示
          return (
            <Link key={path} component={RouterLink} to={path}>
              <ListItem>
                <ListItemIcon className={listItemIcon}>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  className={clsx(Boolean(match) && listItemActive)}
                  disableTypography
                >
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
