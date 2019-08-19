import { useEffect, useState } from "react";
const prefix = "@spax&hooks&persist&";
export function usePersistState(key, initialState) {
    const realKey = `${prefix}${key}`;
    const getState = () => typeof initialState === "function" ? initialState() : initialState;
    const [state, setState] = useState(() => {
        const value = localStorage.getItem(realKey);
        if (value === null) {
            return getState();
        }
        try {
            return JSON.parse(value);
        }
        catch (error) {
            return getState();
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
