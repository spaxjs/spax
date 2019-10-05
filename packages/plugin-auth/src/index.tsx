import { AnyObject, IBlock, IPlugin, IPO, ISlots } from "@spax/core";
import { warn } from "@spax/debug";
import React from "react";

export default {
  name: "Auth",
  deps: [],
  plug: ({ parse }: ISlots, option: IPO) => {
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
  component: React.FC<AnyObject>;
}

function normalizeAuth(
  current: IBlock,
  { useAuth, Forbidden = () => null, Interlude = () => null }: IPO,
): NormalizeResult {
  const { authority, component: C } = current;
  return {
    component: authority ? function PluginAuthWrapper(props: AnyObject) {
      const auth = useAuth(authority);
      if (auth === undefined) {
        return <Interlude />;
      }
      return auth ? <C {...props} /> : <Forbidden />;
    } : C,
  };
}
