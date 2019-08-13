import EventEmitter from "events";
import { Dispatch, SetStateAction, useEffect } from "react";
import { usePersistState } from "./usePersistState";

const emitter = new EventEmitter();
const mapDefault: Map<string, any> = new Map();

export function useGlobalState<S>(
  key: string,
  initialState?: S | (() => S),
  cacheMap: Map<string, any> = mapDefault,
): [S, Dispatch<SetStateAction<S>>] {
  if (cacheMap.has(key)) {
    initialState = cacheMap.get(key);
  } else {
    if (typeof initialState === "function") {
      initialState = (initialState as any)();
    }
    cacheMap.set(key, initialState);
  }
  const [state, setState] = usePersistState(key, initialState);

  const setStateSynchronously = (value: S) => {
    // 派发事件
    emitter.emit(key, value);
    // 将 state 同步到 map
    cacheMap.set(key, value);
  };

  useEffect(() => {
    // mounting 时监听
    emitter.on(key, setState);
    return () => {
      // unmount 时取消监听
      emitter.off(key, setState);
    };
  }, []);

  return [
    state,
    setStateSynchronously,
  ];
}

export function setGlobalState<S>(
  key: string,
  initialState?: S | (() => S),
  cacheMap: Map<string, any> = mapDefault,
): void {
  if (typeof initialState === "function") {
    initialState = (initialState as any)();
  }
  cacheMap.set(key, initialState);
}
