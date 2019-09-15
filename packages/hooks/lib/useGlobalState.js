import { warn } from "@spax/debug";
import EventEmitter from "events";
import { useEffect, useState } from "react";
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.MAX_VALUE);
const storageMap = new Map();
const memStorage = {
    __value: {},
    getItem(key) {
        return this.__value.hasOwnProperty(key) ? this.__value[key] : null;
    },
    setItem(key, value) {
        this.__value[key] = value;
    },
};
export function useGlobalState(key, initialState, _storage) {
    const storage = getStorage(key, _storage);
    const [state, setState] = useState(() => {
        // use storage first
        const storageValue = storage.getItem(key);
        if (storageValue !== null) {
            try {
                return JSON.parse(storageValue);
            }
            catch (error) {
                /* istanbul ignore next */
                if (process.env.NODE_ENV === "development") {
                    warn("Invalid value of %s: %O", key, storageValue);
                }
            }
        }
        // use initialState
        const value = getState(initialState);
        // update storage value
        storage.setItem(key, JSON.stringify(value));
        return value;
    });
    const setStateSynchronously = (value) => {
        // dispatch event
        emitter.emit(key, value);
        // synchronize
        storage.setItem(key, JSON.stringify(value));
    };
    useEffect(() => {
        // add listener on mounted
        emitter.on(key, setState);
        return () => {
            // remove listener on unmounted
            emitter.off(key, setState);
        };
    }, [key]);
    return [
        state,
        setStateSynchronously,
    ];
}
export function setGlobalState(key, initialState, _storage) {
    const storage = getStorage(key, _storage);
    if (storage.getItem(key) === null) {
        storage.setItem(key, JSON.stringify(getState(initialState)));
    }
}
function getState(initialState) {
    return typeof initialState === "function" ? initialState() : initialState;
}
function getStorage(key, storage) {
    if (storage) {
        storageMap.set(key, storage);
        return storage;
    }
    if (storageMap.has(key)) {
        return storageMap.get(key);
    }
    return memStorage;
}
