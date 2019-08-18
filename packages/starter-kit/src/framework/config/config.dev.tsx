import Loading from "framework/components/interaction/Loading";
import React from "react";

export default {
  version: "0.0.1",
  plugins: {
    lazy: {
      fallback: <Loading />,
    },
    router: {
      NotFound: require("framework/components/exception/NotFound").default,
      Forbidden: require("framework/components/exception/Forbidden").default,
    },
  },
};
