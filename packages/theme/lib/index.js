import { createMuiTheme } from "@material-ui/core/styles";
import { setGlobalState, useGlobalState } from "@spax/hooks";
import deepmerge from "deepmerge";
import { useMemo } from "react";
export function setType(type = "light") {
    return setGlobalState("theme-palette-type", type);
}
export function useType(type = "light") {
    return useGlobalState("theme-palette-type", type);
}
export function useTheme(overrides = {}) {
    const [type] = useType();
    return useMemo(() => {
        return createMuiTheme(deepmerge.all([{
                palette: {
                    type,
                },
            }, overrides]));
    }, [type, overrides]);
}
