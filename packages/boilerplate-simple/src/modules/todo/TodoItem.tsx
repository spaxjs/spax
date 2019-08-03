import { Checkbox, Col, Icon, Input, Row } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { ReactElement, useState } from "react";

export default function TodoItem({ title, completed, onToggle, onDestroy, onChange }: any): ReactElement<void> {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(title);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleToggle(e: CheckboxChangeEvent) {
    onToggle(e.target.checked);
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    setEdit(false);
    if (!value) {
      onDestroy();
    } else {
      onChange(value);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // enter key
    if (e.keyCode === 13) {
      setEdit(false);
      if (!value) {
        onDestroy();
      }
    }
  }

  return edit ?
    <Input
      autoFocus
      value={value}
      onBlur={onBlur}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      /> :
    <Row>
      <Col span={2}>
        <Checkbox
          checked={completed}
          onChange={handleToggle}
          />
      </Col>
      <Col span={20}>
        {
          completed ?
          <del>
            {title}
          </del> :
          <label onDoubleClick={() => setEdit(true)}>
            {title}
          </label>
        }
      </Col>
      <Col span={2}>
        <Icon type="delete" onClick={onDestroy} />
      </Col>
    </Row>;
}
