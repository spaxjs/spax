import { Link } from "@wugui/plugin-router";
import { Card } from "antd";
import React from "react";

export default function Forbidden(props: any) {
  return (
    <Card title="403">
      Sorry, you don't have access to this page.
      <hr />
      <Link to="/login">Login</Link>
    </Card>
  );
}
