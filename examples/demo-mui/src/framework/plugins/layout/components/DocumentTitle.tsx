import React from "react";
import { useLayout } from "../hooks/useLayout";

interface IProps {
  fallback: string;
}

export const DocumentTitle: React.FC<IProps> = ({ fallback }: IProps) => {
  const { matched } = useLayout();

  React.useEffect(() => {
    if (matched.length) {
      document.title = matched
        .map(([, { title }]) => title)
        .reverse()
        .concat(fallback)
        .join(" - ");
    }
    return () => {
      document.title = fallback;
    };
  }, [fallback, matched]);

  return null;
};
