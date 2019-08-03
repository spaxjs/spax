import { Link } from "@wugui/plugin-router";
import { Card } from "antd";
import React from "react";

export default function NotFound(props: any) {
  return (
    <Card title="404">
      Sorry, the page you visited does not exist.
      <hr />
      <Link to="/">Home</Link>
    </Card>
  );
}
