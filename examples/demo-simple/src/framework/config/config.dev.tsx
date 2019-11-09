import { IOptions } from "@spax/core";
import React from "react";
import NotFound from "../components/exception/NotFound";
import Loading from "../components/interaction/Loading";

export default {
  lazy: {
    fallback: <Loading />,
  },
  router: {
    NotFound,
  },
} as IOptions;
