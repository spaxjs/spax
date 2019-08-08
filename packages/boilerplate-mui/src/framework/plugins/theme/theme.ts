import { createMuiTheme } from "@material-ui/core/styles";
import { green, lime } from "@material-ui/core/colors";
import { recursive } from "merge";

export default function getTheme(type: "light" | "dark" = "light") {
  const raw = createMuiTheme({
    palette: {
      type,
      background: {
        default: type === "dark" ? "#001529" : "#ffffff",
      },
      primary: green,
      secondary: lime,
      // warning: {
      //   main: "#ffc071",
      //   dark: "#ffb25e",
      // },
      // error: {
      //   // xLight: red[50],
      //   main: red[500],
      //   dark: red[700],
      // },
      // success: {
      //   xLight: green[50],
      //   dark: green[700],
      // },
    },
  });

  return recursive(raw, {
    palette: {
      primary: {
        contrastText: "#ffffff"
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
};
