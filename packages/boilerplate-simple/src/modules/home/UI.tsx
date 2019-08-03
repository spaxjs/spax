import { Link } from "@wugui/plugin-router";
import { Card } from "antd";
import React, { ReactElement } from "react";

export default function UI(props: any): ReactElement<void> {
  return (
    <Card title={props.title}>
      Goto: <Link to="/dashboard">Dashboard</Link>
    </Card>
  );
}
