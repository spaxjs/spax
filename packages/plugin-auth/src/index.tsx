import { AnyObject, IBlock, IPlugin, IPO, ISlots } from "@spax/core";
import { useGlobalState } from "@spax/hooks";
import React from "react";

export default {
  name: "Auth",
  deps: [],
  plug: ({ parse }: ISlots, option: IPO) => {
    parse.tap((current: IBlock) => {
      return {
        ...current,
        ...normalizeAuth(current, option),
      };
    });
  },
} as IPlugin;

interface WrapperProps {
  children: React.ReactElement;
  authority: string[];
  roleKey: string;
  Forbidden: React.FC;
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  authority,
  roleKey,
  Forbidden,
}: WrapperProps): React.ReactElement => {
  const [role] = useGlobalState<string>(roleKey);
  return hasAuth(role, authority) ? children : <Forbidden />;
};

function hasAuth(role: string, authority: string[]): boolean {
  if (authority.length === 0) {
    return true;
  }
  if (!role) {
    return false;
  }
  return authority.indexOf(role) !== -1;
}

interface NormalizeResult {
  authority: string[];
  component: React.FC;
}

function normalizeAuth(
  current: IBlock,
  { roleKey = "role", Forbidden = () => null }: IPO,
): NormalizeResult {
  const { authority = [], component: C } = current;
  return {
    authority,
    component: (props: AnyObject) => {
      return (
        <Wrapper authority={authority} roleKey={roleKey} Forbidden={Forbidden}>
          <C {...props} />
        </Wrapper>
      );
    },
  };
}
