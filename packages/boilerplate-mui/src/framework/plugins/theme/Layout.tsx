import { IPO } from "@wugui/core";
import React from "react";
import { useLayout } from "./hooks";

export const Layout: React.FC<{ option: IPO }> = ({children, option}: any) => {
  const UseLayout = useLayout();

  return (
    <UseLayout option={option}>
      {children}
    </UseLayout>
  );
};
