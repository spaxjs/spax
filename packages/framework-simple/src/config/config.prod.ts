import { IOptions } from "@spax/core";

export default {
  auth: {
    Forbidden: require("../components/exception/Forbidden").default,
  },
  router: {
    NotFound: require("../components/exception/NotFound").default,
  },
} as IOptions;
