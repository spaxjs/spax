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

export default {
  path: "c2",
  title: "C2",
  component: UI,
  modules: [
    import("../c1/modules/c1"),
    import("../c1/modules/c2"),
  ],
};