import { useGlobalState } from "@wugui/hooks";
import { Avatar, Badge, Button, Card, Icon } from "antd";
import React, { ReactElement } from "react";

export default function GlobalCount(props: any): ReactElement<void> {
  const [count, setCount, resetCount] = useGlobalState("count");
  return (
    <Card className={props.className} title={props.meta.title}>
      <Button
        className="minus"
        onClick={() => setCount(prevCount => prevCount - 1)}
      >
        -
      </Button>
      <Badge showZero count={count} overflowCount={9}>
        <Avatar>
          <Icon type="reload" onClick={resetCount} />
        </Avatar>
      </Badge>
      <Button
        className="plus"
        onClick={() => setCount(prevCount => prevCount + 1)}
      >
        +
      </Button>
    </Card>
  );
}
