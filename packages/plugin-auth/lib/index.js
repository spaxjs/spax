import { warn } from "@spax/debug";
import React from "react";
export default {
    name: "Auth",
    deps: [],
    plug: ({ parse }, option) => {
        if (!option.useAuth) {
            if (process.env.NODE_ENV === "development") {
                warn("Plugin config `auth.useAuth` is required!");
            }
            return;
        }
        parse.tap((current) => {
            return {
                ...current,
                ...normalizeAuth(current, option),
            };
        });
    },
};
function normalizeAuth(current, { useAuth, Forbidden = () => null, Interlude = () => null }) {
    const { authority, component: C } = current;
    return {
        component: authority ? function PluginAuthWrapper(props) {
            const auth = useAuth(authority);
            if (auth === undefined) {
                return React.createElement(Interlude, null);
            }
            return auth ? React.createElement(C, Object.assign({}, props)) : React.createElement(Forbidden, null);
        } : C,
    };
}
