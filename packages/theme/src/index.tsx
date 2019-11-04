import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { useMemo } from "react";

export function useTheme(overrides: Partial<ThemeOptions> = {}) {
  return useMemo(() => {
    return createMuiTheme(overrides);
  }, [overrides]);
}
