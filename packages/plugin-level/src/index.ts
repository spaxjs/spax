import { IBlock, IPlugin, ISlots } from "@spax/core";

export default {
  name: "Level",
  deps: [],
  plug: ({ parse }: ISlots) => {
    parse.tap(
      (current: IBlock, parent: IBlock) => {
        return {
          ...current,
          level: parent.level ? parent.level + 1 : 1,
        };
      },
    );
  },
} as IPlugin;
