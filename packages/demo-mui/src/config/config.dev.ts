import blocks from "blocks";
import * as store from "store";

export default {
  blocks,
  plugins: {
    store: {
      provider: [store],
      initialStates: {
        GlobalCount: 0,
      },
    },
  },
};
