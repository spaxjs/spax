import { Card } from "antd";
import React, { ReactElement } from "react";
import { useDB } from "./state";

export default function View(props: any): ReactElement<void> {
  const [data] = useDB();
  const {meta: { title }, id} = props;
  const found = data.find(({ key }) => key === id);

  // console.log(props);

  return (
    <Card title={title}>
      <pre>
        {JSON.stringify(found, null, 2)}
      </pre>
    </Card>
  );
}
