import { useT } from "@spax/i18n";
import { useMatchedArrayOfBlockAndParams } from "@spax/router";
import React, { useEffect } from "react";

export function useLayout(): React.FC<{ option: any }> {
  const matched = useMatchedArrayOfBlockAndParams();

  if (matched && matched[0] && matched[0][0]) {
    return matched[0][0].layout === "blank"
      ? require("./layouts/Blank").default
      : require("./layouts/Admin").default;
  }

  // 模块未匹配到，等待……，但是需要将 children 下传，否则无法触发匹配
  return ({ children }) => (<div>{children}</div>);
}

export function useTitle(fallback: string): void {
  const matched = useMatchedArrayOfBlockAndParams();
  const { t } = useT();

  useEffect(() => {
    document.title = matched
      .filter(([{ title, path }]) => Boolean(title) && path !== "/" )
      .map(([{ title }]) => t(title))
      .reverse()
      .concat(fallback)
      .join(" - ");
    // reset the title
    return () => {
      document.title = fallback;
    };
  }, [fallback, matched, t]);
}
