import { useGlobalState } from "@spax/hooks";
import Loading from "framework/components/interaction/Loading";
import React, { useEffect, useState } from "react";

// const scope = "demo-mui";
const initialStates = {
  themeType: "light",
  role: "",
  lng: "zh",
  "sidebar-open": true,
  repo: {
    url: "https://github.com/crossjs/spax",
  },
};

function hasAuth(role: string, authority: string[]) {
  if (authority.length === 0) {
    return true;
  }
  if (!role) {
    return false;
  }
  return authority.indexOf(role) !== -1;
}

export default {
  version: "0.0.1",
  // scope,
  plugins: {
    i18n: {
      fallbackLng: initialStates.lng,
    },
    store: {
      initialStates,
    },
    theme: {
      logoImage: require("images/logo.png"),
      siteTitle: "spax",
    },
    lazy: {
      fallback: <Loading />,
    },
    router: {
      NotFound: require("framework/components/exception/NotFound").default,
      Forbidden: require("framework/components/exception/Forbidden").default,
      useAuth: function useAuth({ authority } = { authority: [] }): boolean {
        const [role] = useGlobalState<string>("role");
        const [auth, setAuth] = useState(undefined);

        useEffect(() => {
          let unmounted = false;
          // 模拟异步
          setImmediate(() => {
            if (!unmounted) {
              setAuth(hasAuth(role, authority));
            }
          });
          return () => {
            unmounted = true;
          };
        }, [role, authority]);
        return auth;
      },
    },
  },
};
