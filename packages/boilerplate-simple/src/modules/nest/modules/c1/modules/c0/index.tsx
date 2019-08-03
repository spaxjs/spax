import { Avatar, Badge, Button, Card } from "antd";
import React, { ReactElement, useState } from "react";

function UI(props: any): ReactElement<void> {
  const [count, setCount] = useState(0);
  return (
    <>
      <Card title={props.meta.title}>
        <Button onClick={() => setCount(count + 1)}>
          +
        </Button>
        <Badge showZero count={count} overflowCount={9}>
          <Avatar>A</Avatar>
        </Badge>
        <Button onClick={() => setCount(Math.max(0, count - 1))}>
          -
        </Button>
      </Card>
      {props.renderChildModules()}
    </>
  );
}

/**
 * path 为空字符串，
 * 表示与父级拥有同样的 path，
 * 意味着会一同显示。
 */
export default {
  path: "",
  title: "C0",
  component: UI,
  modules: [{
    path: "",
    title: "C0",
    component: UI,
    modules: [{
      path: "",
      title: "C0",
      component: UI,
    }],
  }],
};
