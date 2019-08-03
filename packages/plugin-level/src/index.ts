import { ICoreHooks, IModule, IPluginOption } from "@wugui/core";

export default ({ parse }: ICoreHooks) => {
  parse.tap("Level", (current: IModule, parent: IModule, option: IPluginOption) => {
    return {
      ...current,
      level: parent.level ? parent.level + 1 : 1,
    };
  });
};
