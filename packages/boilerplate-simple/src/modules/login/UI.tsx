import { useGlobalState } from "@wugui/hooks";
import { Link, usePathname } from "@wugui/plugin-router";
import { Button, Checkbox, Form, Icon, Input } from "antd";
import React, { useEffect } from "react";

function UI(props: any) {
  const [auth, setAuth] = useGlobalState<string>("auth");
  const [, setPath] = usePathname();
  const { getFieldDecorator } = props.form;

  function handleSubmit(e: any) {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        setAuth(values.username);
      }
    });
  }

  useEffect(() => {
    if (auth) {
      setPath("/");
    }
  }, [auth, setPath]);

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item
        extra="admin or guest"
      >
        {getFieldDecorator("username", {
          initialValue: auth,
          rules: [{ required: true, message: "Please input your username!" }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item
        extra="any strings"
      >
        {getFieldDecorator("password", {
          initialValue: auth,
          rules: [{ required: true, message: "Please input your Password!" }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("remember", {
          valuePropName: "checked",
          initialValue: true,
        })(<Checkbox>Remember me</Checkbox>)}
        <Button
          type="primary"
          htmlType="submit"
          icon="login"
        >
          Login
        </Button>
        <Link to="/register">Register</Link>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: "login" })(UI);
