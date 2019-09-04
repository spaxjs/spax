import { useGlobalState } from "@spax/hooks";
import { useT } from "@spax/i18n";
import { useEffect } from "react";

export function useMatchedList() {
  return useGlobalState("demo-ui/layout", [], null);
}

export function useTitle(fallback: string): void {
  const [matched] = useMatchedList();
  const { t } = useT();

  useEffect(() => {
    document.title = matched
      .filter(({ $$block: { title, path } }) => Boolean(title) && path !== "/" )
      .map(({ $$block: { title }}) => t(title))
      .reverse()
      .concat(fallback)
      .join(" - ");
    // reset the title
    return () => {
      document.title = fallback;
    };
  }, [fallback, matched, t]);
}
