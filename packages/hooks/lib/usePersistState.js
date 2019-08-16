import { useEffect, useState } from "react";
const prefix = "@spax&hooks&persist&";
export function usePersistState(key, initialState) {
    const realKey = `${prefix}${key}`;
    const [state, setState] = useState(() => {
        const value = localStorage.getItem(realKey);
        if (value === null) {
            return typeof initialState === "function" ? initialState() : initialState;
        }
        try {
            return JSON.parse(value);
        }
        catch (error) {
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
