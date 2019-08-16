import EventEmitter from "events";
import { useEffect } from "react";
import { usePersistState } from "./usePersistState";
const emitter = new EventEmitter();
const mapDefault = new Map();
export function useGlobalState(key, initialState, cacheMap = mapDefault) {
    if (cacheMap.has(key)) {
        initialState = cacheMap.get(key);
    }
    else {
        if (typeof initialState === "function") {
            initialState = initialState();
        }
        cacheMap.set(key, initialState);
    }
    const [state, setState] = usePersistState(key, initialState);
    const setStateSynchronously = (value) => {
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
export function setGlobalState(key, initialState, cacheMap = mapDefault) {
    if (typeof initialState === "function") {
        initialState = initialState();
    }
    cacheMap.set(key, initialState);
}
