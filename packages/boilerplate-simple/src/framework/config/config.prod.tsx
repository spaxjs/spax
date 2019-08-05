import { useGlobalState } from "@wugui/hooks";
import { InProgress } from "grommet-icons";
import React from "react";

const initialStates = {
  auth: "",
  count: 0,
  repo: {
    url: "https://github.com/crossjs/wugui",
  },
};

function hasAuth(auth: string, authority: string[]) {
  if (authority.length === 0) {
    return true;
  }
  if (!auth) {
    return false;
  }
  return authority.indexOf(auth) !== -1;
}

export default {
  version: "0.0.1",
  plugins: {
    store: {
      initialStates,
    },
    theme: {
      hideBreadcrumb: false,
      logoImage: require("images/wugui.png"),
      logoTitle: "wugui",
      siteTitle: "wugui",
    },
    lazy: {
      fallback: <InProgress size="xlarge" />,
    },
    router: {
      NotFound: require("framework/components/exception/NotFound").default,
      Forbidden: require("framework/components/exception/Forbidden").default,
      useAuth: function useAuth({ authority } = { authority: [] }): boolean {
        const [auth] = useGlobalState<string>("auth");
        return hasAuth(auth, authority);
      },
    },
  },
};
