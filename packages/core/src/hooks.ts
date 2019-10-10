import React from "react";
import { cache } from "./cache";
import { KEY_PARSED, KEY_RENDERED } from "./constants";
import { IBlock } from "./types";

/**
 * Hook for cached value of the specified key
 */
function useCached<S>(key: string): [S, (value: S) => void] {
  const [state, setState] = React.useState(cache.get<S>(key));

  React.useEffect(() => {
    cache.on(key, setState);
    return () => {
      cache.off(key, setState);
    };
  }, []);

  return [
    state,
    (value: S): void => {
      cache.set(key, value, true);
    },
  ];
}

export function useParsed(): [IBlock[], (v: IBlock[]) => void] {
  return useCached<IBlock[]>(KEY_PARSED);
}

export function useRendered(): [React.ReactNode, (v: React.ReactNode) => void] {
  return useCached<any>(KEY_RENDERED);
}
