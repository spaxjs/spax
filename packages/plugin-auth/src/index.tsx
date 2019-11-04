import { IBlock, IHooks, IOption, IPlugin, ObjectOf } from "@spax/core";
import { warn } from "@spax/debug";
import React from "react";

export default {
  name: "Auth",
  plug: ({ parse }: IHooks, option: IOption) => {
    if (!option.useAuth) {
      if (process.env.NODE_ENV === "development") {
        warn("Plugin config `auth.useAuth` is required!");
      }
      return;
    }
    parse.tap((current: IBlock) => {
      return {
        ...current,
        ...normalizeAuth(current, option),
      };
    });
  },
} as IPlugin;

interface NormalizeResult {
  component: React.FC<ObjectOf>;
}

function normalizeAuth(
  current: IBlock,
  { useAuth, Forbidden = () => null, Interlude = () => null }: IOption,
): NormalizeResult {
  const { authority, component: C } = current;
  return {
    component: authority ? function PluginAuthWrapper(props: ObjectOf) {
      const auth = useAuth(authority);
      if (auth === undefined) {
        return <Interlude />;
      }
      return auth ? <C {...props} /> : <Forbidden />;
    } : C,
  };
}
