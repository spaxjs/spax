import { Grommet } from "grommet";
import React from "react";
import { useLayout, useTitle } from "./hooks";

export default function Theme(props: any) {
  const Layout = useLayout();

  useTitle(props.option.siteTitle);

  return (
    <Grommet theme={theme}>
      <Layout option={props.option}>
        {props.children}
      </Layout>
    </Grommet>
  );
}

const theme = {
  "global": {
    "colors": {
      "brand": "#52C41A",
      "background": "#F0F2F5",
      "focus": "#73D13D",
      "dark-1": "#001529",
      // "text": {
      //   "light": "white",
      // },
      // https://github.com/grommet/grommet/issues/2820
      // "icon": {
      //   "light": "brand",
      // },
    },
    "font": {
      "family": "Helvetica",
    },
    "control": {
      "border": {
        "radius": "0px",
      },
    },
    // "text": {
    //   "light": "brand",
    // },
  },
  "anchor": {
    "fontWeight": "normal",
    // "color": {
    //   "dark": "accent-1",
    //   "light": "brand",
    // },
    "hover": {
      "textDecoration": "none",
    },
  },
  "button": {
    "border": {
      "color": "transparent",
      "width": "0px",
      "radius": "0px",
    },
    "primary": {
      "color": {
        // 背景色
        "light": "brand",
      },
    },
    // "color": {
    //   // 前景色
    //   "light": "white",
    // },
    "extend": (props: any) => {
      return `
        font-weight: ${props.primary ? "bold" : "normal"};
      `;
    },
  },
  "checkBox": {
    "check": {
      "radius": "0px",
    },
    "toggle": {
      "radius": "0px",
    },
  },
  "formField": {
    "border": false,
  },
  "radioButton": {
    "check": {
      "radius": "0px",
    },
  },
};
