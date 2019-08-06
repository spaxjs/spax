import { useMatched } from "@wugui/plugin-router";
import { FunctionComponent, useEffect } from "react";

export function useLayout(): FunctionComponent<{ option: any }> {
  const [firstMatched] = useMatched(1);

  if (firstMatched && firstMatched[0]) {
    const { layout } = firstMatched[0];
    return layout === "blank"
      ? require("./layouts/Blank").default
      : require("./layouts/Admin").default;
  }

  return require("./layouts/Admin").default;
}

export function useTitle(defaultTitle: string): void {
  const matched = useMatched();

  useEffect(() => {
    document.title = matched
      .filter(([{ title, path }]) => Boolean(title) && path !== "/" )
      .map(([{ title }]) => title)
      .reverse()
      .concat(defaultTitle)
      .join(" - ");
    // reset the title
    return () => {
      document.title = defaultTitle;
    };
  }, [defaultTitle, matched]);
}
