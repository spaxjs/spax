import { createMuiTheme } from "@material-ui/core/styles";
import { useMemo } from "react";
export function useTheme(overrides = {}) {
    return useMemo(() => {
        return createMuiTheme(overrides);
    }, [overrides]);
}
