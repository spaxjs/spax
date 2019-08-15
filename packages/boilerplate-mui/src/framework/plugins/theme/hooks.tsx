import { useMatched } from "@spax/router";
import React, { useEffect } from "react";

export function useLayout(): React.FC<{ option: any }> {
  const matched = useMatched();

  if (matched && matched[0] && matched[0][0]) {
    return matched[0][0].layout === "blank"
      ? require("./layouts/Blank").default
      : require("./layouts/Admin").default;
  }

  return require("./layouts/Admin").default;
}

export function useTitle(fallback: string): void {
  const matched = useMatched();

  useEffect(() => {
    document.title = matched
      .filter(([{ title, path }]) => Boolean(title) && path !== "/" )
      .map(([{ title }]) => title)
      .reverse()
      .concat(fallback)
      .join(" - ");
    // reset the title
    return () => {
      document.title = fallback;
    };
  }, [fallback, matched]);
}
