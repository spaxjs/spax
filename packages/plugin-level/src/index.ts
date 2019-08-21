import { IBlock, IHooks, IPO } from "@spax/core";

export default ({ parse }: IHooks) => {
  parse.tap("Level", (current: IBlock, parent: IBlock, option: IPO) => {
    return {
      ...current,
      level: parent.level ? parent.level + 1 : 1,
    };
  });
};
