import React from "react";
import { useTitle } from "../hooks";

interface IProps {
  fallback: string;
}

export const DocumentTitle: React.FC<IProps> = ({ fallback }: IProps) => {
  useTitle(fallback);

  return null;
};
