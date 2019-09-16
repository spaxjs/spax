import { useGlobalState } from "@spax/hooks";
import React from "react";
export default {
    name: "Auth",
    deps: [],
    plug: ({ parse }, option) => {
        parse.tap((current) => {
            return {
                ...current,
                ...normalizeAuth(current, option),
            };
        });
    },
};
const Wrapper = ({ children, authority, roleKey, Forbidden, }) => {
    const [role] = useGlobalState(roleKey);
    return hasAuth(role, authority) ? children : React.createElement(Forbidden, null);
};
function hasAuth(role, authority) {
    if (authority.length === 0) {
        return true;
    }
    if (!role) {
        return false;
    }
    return authority.indexOf(role) !== -1;
}
function normalizeAuth(current, { roleKey = "role", Forbidden = () => null }) {
    const { authority = [], component: C } = current;
    return {
        authority,
        component: (props) => {
            return (React.createElement(Wrapper, { authority: authority, roleKey: roleKey, Forbidden: Forbidden },
                React.createElement(C, Object.assign({}, props))));
        },
    };
}
