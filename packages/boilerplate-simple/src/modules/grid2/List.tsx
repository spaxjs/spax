import { Link, usePathname, useSearch } from "@wugui/plugin-router";
import { Button, Card, Divider, Table, Tag } from "antd";
import React, { ReactElement } from "react";
import { useDB } from "../grid/state";

export default function UI(props: any): ReactElement<void> {
  const [pathname] = usePathname();
  const [search, setSearch] = useSearch();
  const [data] = useDB();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (title: string, record: any) => {
        return (
          <Link to={`${pathname}/${record.key}`}>{title}</Link>
        );
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags: string[]) => (
        <span>
          {tags.map((tag: string) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (title: string, record: any) => (
        <span>
          <Link to={`${pathname}/${record.key}/edit`}>Edit</Link>
          <Divider type="vertical" />
          <Button>Delete</Button>
        </span>
      ),
    },
  ];

  return props.exact ? (
    <Card title={props.meta.title}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: +(search.page || "1"),
          pageSize: 2,
          pageSizeOptions: ["1", "2", "3"],
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total: number, range) => `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page: number) => {
            setSearch({ page });
          },
        }}
      />
    </Card>
  ) : props.renderChildModules();
}
