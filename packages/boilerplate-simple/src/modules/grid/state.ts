import { useGlobalState } from "@wugui/hooks";
// import React from "react";

interface IData {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const initialData: IData[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export function useDB(): [IData[], (_data: IData[]) => void] {
  const [data, setData] = useGlobalState("grid", initialData);
  return [
    data,
    setData,
  ];
}
