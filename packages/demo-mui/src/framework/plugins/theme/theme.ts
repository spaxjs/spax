import { green, lime } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import { recursive } from "merge";

export default function getTheme(type: "light" | "dark" = "light") {
  const raw = createMuiTheme({
    palette: {
      type,
      primary: green,
      secondary: lime,
    },
  });

  return recursive(raw, {
    palette: {
      primary: {
        contrastText: "#ffffff",
      },
      secondary: {
        contrastText: raw.palette.primary.main,
      },
    },
    typography: {
      h1: {
        fontSize: 32,
      },
      h2: {
        fontSize: 28,
      },
      h3: {
        fontSize: 24,
      },
      h4: {
        fontSize: 20,
      },
      h5: {
        fontSize: 16,
      },
      h6: {
        fontSize: 12,
      },
    },
    custom: {
      sidebar: {
        width: 200,
      },
    },
  });
}
