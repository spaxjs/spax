import { usePersistState } from "@wugui/hooks";
import { Card, Empty, Input } from "antd";
import React, { ReactElement, useState } from "react";
import TodoItem from "./TodoItem";

export default function UI(props: any): ReactElement<void> {
  const [items, setItems] = usePersistState("todo", []);
  const [value, setValue] = useState("");

  function onNewChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function onNewKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // enter key
    if (e.keyCode === 13) {
      setItems([...items, {
        title: e.currentTarget.value,
        completed: false,
      }]);
      setValue("");
    }
  }

  function onChange(index: number, v: string) {
    const _items = [...items];
    _items[index].title = v;
    setItems(_items);
  }

  function onToggle(index: number, v: boolean) {
    const _items = [...items];
    _items[index].completed = v;
    setItems(_items);
  }

  function onDestroy(index: number) {
    const _items = [...items];
    _items.splice(index, 1);
    setItems(_items);
  }

  return (
    <>
      <Card title={props.meta.title}>
        {
          items.length ? items.map(({ title, completed }, index) => {
            return (
              <TodoItem
                key={`${index}-${title}`}
                title={title}
                completed={completed}
                onToggle={(v: boolean) => onToggle(index, v)}
                onChange={(v: string) => onChange(index, v)}
                onDestroy={() => onDestroy(index)}
                />
            );
          }) : <Empty />
        }
        <Input
          value={value}
          onChange={onNewChange}
          onKeyDown={onNewKeyDown}
          />
      </Card>
    </>
  );
}
