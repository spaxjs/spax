import { IBlock, IHooks, TPlugin } from "@spax/core";

export default [
  "Level",
  [],
  ({ parse }: IHooks) => {
    parse.tap(
      (current: IBlock, parent: IBlock) => {
        return {
          ...current,
          level: parent.level ? parent.level + 1 : 1,
        };
      },
    );
  },
] as TPlugin;
