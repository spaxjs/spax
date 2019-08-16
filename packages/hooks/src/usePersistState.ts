import { Dispatch, SetStateAction, useEffect, useState } from "react";

const prefix = "@spax&hooks&persist&";

export function usePersistState<S>(key: string, initialState?: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const realKey = `${prefix}${key}`;
  const [state, setState] = useState(() => {
    const value = localStorage.getItem(realKey);
    if (value === null) {
      return typeof initialState === "function" ? (initialState as any)() : initialState;
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  });

  useEffect(() => {
    localStorage.setItem(realKey, JSON.stringify(state));
  }, [state]);

  return [
    state,
    setState,
  ];
}
