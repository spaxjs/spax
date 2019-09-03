import { AnyObject, IBlock, IHooks, IPO, TPlugin } from "@spax/core";
import { useGlobalState } from "@spax/hooks";
import React from "react";

export default [
  "Auth",
  [],
  ({ parse }: IHooks, option: IPO) => {
    parse.tap((current: IBlock, parent: IBlock) => {
      return {
        ...current,
        ...normalizeAuth(current, parent, option),
      };
    });
  },
] as TPlugin;

const Wrapper: React.FC<any> = ({
  children = null,
  authority,
  roleKey,
  Forbidden,
}: any) => {
  const [role] = useGlobalState<string>(roleKey);
  return hasAuth(role, authority) ? children : <Forbidden />;
};

function hasAuth(role: string, authority: string[]) {
  if (authority.length === 0) {
    return true;
  }
  if (!role) {
    return false;
  }
  return authority.indexOf(role) !== -1;
}

function normalizeAuth(
  current: IBlock,
  parent: IBlock,
  { roleKey = "role", Forbidden = () => null }: IPO,
): AnyObject {
  const { authority = [], component: C } = current;
  return {
    authority,
    component: (props: any) => {
      return (
        <Wrapper authority={authority} roleKey={roleKey} Forbidden={Forbidden}>
          <C {...props} />
        </Wrapper>
      );
    },
  };
}
