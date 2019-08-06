import EventEmitter from "events";
import { Dispatch, SetStateAction, useEffect } from "react";
import { usePersistState } from "./usePersistState";

const emitter = new EventEmitter();

const map: Map<string, any> = new Map();
const mapInitial: Map<string, any> = new Map();

export function useGlobalState<S>(key: string, initialState?: S | (() => S)): [S, Dispatch<SetStateAction<S>>, () => void] {
  const [state, setState] = usePersistState(key, map.has(key) ? map.get(key) : initialState);

  useEffect(() => {
    // mounting 时监听
    emitter.on(key, setState);
    return () => {
      // unmount 时取消监听
      emitter.off(key, setState);
    };
  }, []);

  // state 变更时
  useEffect(() => {
    // 将 state 同步到 map
    map.set(key, state);
    // 先取消监听，避免死循环
    emitter.off(key, setState);
    // 通知更新
    emitter.emit(key, state);
    // 再监听更新
    emitter.on(key, setState);
  }, [state]);

  const resetState = () => {
    if (mapInitial.has(key)) {
      setState(mapInitial.get(key));
    }
  };

  return [
    state,
    setState,
    resetState,
  ];
}

export function initGlobalState<S>(key: string, initialState: S | (() => S), mapProvider?: any): void {
  const state = typeof initialState === "function" ? (initialState as any)() : initialState;
  map.set(key, state);
  mapInitial.set(key, state);
}
