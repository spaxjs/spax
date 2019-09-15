import { PaletteType } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
export declare function setType(type?: PaletteType): void;
export declare function useType(type?: PaletteType): [PaletteType, (type: PaletteType) => void];
export declare function useTheme(overrides?: Partial<ThemeOptions>): import("@material-ui/core").Theme;
