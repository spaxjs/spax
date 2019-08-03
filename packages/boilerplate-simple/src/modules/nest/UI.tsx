import { Avatar, Badge, Button, Card } from "antd";
import React, { ReactElement, useState } from "react";

export default function UI(props: any): ReactElement<void> {
  const [count, setCount] = useState(0);

  // 如果当前路由指向子孙，则只显示子孙
  return props.exact ? (
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
  ) : props.renderChildModules();
}
