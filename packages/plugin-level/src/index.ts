import { IBlock, IHooks, IPlugin } from "@spax/core";

export default {
  name: "Level",
  plug: ({ parse }: IHooks) => {
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
