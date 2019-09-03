import { useGlobalState } from "@spax/hooks";
import React from "react";
export default [
    "Auth",
    [],
    ({ parse }, option) => {
        parse.tap((current, parent) => {
            return {
                ...current,
                ...normalizeAuth(current, parent, option),
            };
        });
    },
];
const Wrapper = ({ children = null, authority, roleKey, Forbidden, }) => {
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
function normalizeAuth(current, parent, { roleKey = "role", Forbidden = () => null }) {
    const { authority = [], component: C } = current;
    return {
        authority,
        component: (props) => {
            return (React.createElement(Wrapper, { authority: authority, roleKey: roleKey, Forbidden: Forbidden },
                React.createElement(C, Object.assign({}, props))));
        },
    };
}
