import { IOptions } from "@spax/framework";
import blocks from "blocks";
import store from "store";

export default {
  blocks,
  plugins: {
    store,
  },
} as IOptions;
