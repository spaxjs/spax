import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import React from "react";

export function useTheme(overrides: Partial<ThemeOptions> = {}) {
  return React.useMemo(() => {
    return createMuiTheme(overrides);
  }, [overrides]);
}
