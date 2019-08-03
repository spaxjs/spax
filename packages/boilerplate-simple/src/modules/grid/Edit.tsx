import { Button, Card, Form, Input, InputNumber } from "antd";
import React, { ReactElement } from "react";
import { useDB } from "./state";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function Edit(props: any): ReactElement<void> {
  const [data, setData] = useDB();

  const {id} = props;

  const found = data.find(({ key }) => key === id);

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

  // Only show error after a field is touched.
  const nameError = isFieldTouched("name") && getFieldError("name");
  const ageError = isFieldTouched("age") && getFieldError("age");
  const addressError = isFieldTouched("address") && getFieldError("address");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setData(data.map((d) => {
          if (d.key === id) {
            return {
              ...d,
              ...values,
            };
          }
          return d;
        }));
      }
    });
  };

  const handleReset = () => {
    props.form.resetFields();
  };

  return (
    <Card title={props.meta.title}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item
          label="Name"
          validateStatus={nameError ? "error" : ""}
          help={nameError || ""}>
          {getFieldDecorator("name", {
            initialValue: found.name,
            rules: [{ required: true, message: "Please input your name!" }],
          })(
            <Input
              placeholder="Name"
            />,
          )}
        </Form.Item>
        <Form.Item
          label="Age"
          validateStatus={ageError ? "error" : ""}
          help={ageError || ""}>
          {getFieldDecorator("age", {
            initialValue: found.age,
            rules: [{ required: true, message: "Please input your age!" }],
          })(
            <InputNumber
              placeholder="Age"
            />,
          )}
        </Form.Item>
        <Form.Item
          label="Address"
          validateStatus={addressError ? "error" : ""}
          help={addressError || ""}>
          {getFieldDecorator("address", {
            initialValue: found.address,
            rules: [{ required: true, message: "Please input your address!" }],
          })(
            <Input.TextArea
              placeholder="Address"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Submit
          </Button>
          <Button style={{ marginLeft: 8 }} type="ghost" htmlType="button" onClick={handleReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Form.create({ name: "edit_form" })(Edit);
