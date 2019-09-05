import React from "react";
import Loading from "../components/interaction/Loading";
import store from "../store";

export default {
  version: "0.0.1",
  plugins: {
    i18n: {
      fallbackLng: "zh",
    },
    store,
    theme: {
      logoImage: require("images/logo.png"),
      siteTitle: "spax",
    },
    layout: {
      logoImage: require("images/logo.png"),
      siteTitle: "spax",
    },
    lazy: {
      fallback: <Loading />,
    },
    auth: {
      roleKey: "role",
      Forbidden: require("../components/exception/Forbidden").default,
    },
    router: {
      NotFound: require("../components/exception/NotFound").default,
    },
  },
};
