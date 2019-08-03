import { usePersistState } from "@wugui/hooks";
import { Avatar, Badge, Button, Card } from "antd";
import React, { ReactElement } from "react";

export default function PersistCount(props: any): ReactElement<void> {
  const [count, setCount] = usePersistState("count", 0);
  return (
    <Card title={props.title}>
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
  );
}
