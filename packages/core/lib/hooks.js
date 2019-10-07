import React from "react";
import { cache } from "./cache";
import { KEY_PARSED, KEY_RENDERED } from "./constants";
/**
 * Hook for cached value of the specified key
 */
export function useCached(key) {
    const [state, setState] = React.useState(cache.get(key));
    React.useEffect(() => {
        cache.on(key, setState);
        return () => {
            cache.off(key, setState);
        };
    }, []);
    return [
        state,
        (value) => {
            cache.set(key, value, true);
        },
    ];
}
export function useParsed() {
    return useCached(KEY_PARSED);
}
export function useRendered() {
    return useCached(KEY_RENDERED);
}
