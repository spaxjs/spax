import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function usePersistState<S>(key: string, initialState?: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(() => {
    const value = localStorage.getItem(key);
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
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [
    state,
    setState,
  ];
}
