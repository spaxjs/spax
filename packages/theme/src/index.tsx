import { PaletteType } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { setGlobalState, useGlobalState } from "@spax/hooks";
import deepmerge from "deepmerge";
import { useMemo } from "react";

export function setType(type: PaletteType = "light"): void {
  return setGlobalState<PaletteType>("theme-palette-type", type);
}

export function useType(
  type: PaletteType = "light",
): [PaletteType, (type: PaletteType) => void] {
  return useGlobalState<PaletteType>("theme-palette-type", type);
}

export function useTheme(overrides: Partial<ThemeOptions> = {}) {
  const [ type ] = useType();

  return useMemo(() => {
    return createMuiTheme(deepmerge.all([{
      palette: {
        type,
      },
    }, overrides]));
  }, [type, overrides]);
}
