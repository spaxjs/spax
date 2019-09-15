import { Box, Button, IconButton, InputAdornment, Link as L, TextField } from "@material-ui/core";
import { Fingerprint, Visibility, VisibilityOff } from "@material-ui/icons";
import { usePathname } from "@spax/history";
import { useGlobalState } from "@spax/hooks";
import { useT } from "@spax/i18n";
import { Link } from "@spax/router";
import React, { useEffect, useState } from "react";
export default function UI(props) {
    const [role, setRole] = useGlobalState("role");
    const [, setPath] = usePathname();
    const [t] = useT("Theme");
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin");
    const [reveal, setReveal] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        if (username && password) {
            setRole(username);
        }
        else {
            alert("Please input username!");
        }
    }
    useEffect(() => {
        if (role) {
            setPath("/");
        }
    }, [role, setPath]);
    return (React.createElement(React.Fragment, null,
        React.createElement(TextField, { fullWidth: true, margin: "normal", variant: "outlined", label: t("Account"), placeholder: "admin or guest", value: username, onChange: event => setUsername(event.target.value) }),
        React.createElement(TextField, { fullWidth: true, margin: "normal", variant: "outlined", label: t("Password"), type: reveal ? "text" : "password", value: password, onChange: event => setPassword(event.target.value), InputProps: { endAdornment: React.createElement(InputAdornment, { position: "end" },
                    React.createElement(IconButton, { onClick: () => setReveal(!reveal) }, reveal ? React.createElement(Visibility, null) : React.createElement(VisibilityOff, null))),
            } }),
        React.createElement(Box, { py: 1 },
            React.createElement(Button, { disabled: !(username && password), fullWidth: true, size: "large", variant: "contained", color: "primary", onClick: handleSubmit },
                React.createElement(Fingerprint, null),
                " ",
                t("Login"))),
        React.createElement(Box, { display: "flex", flexDirection: "row" },
            React.createElement(Box, { flexGrow: 1 },
                React.createElement(Link, { component: L, to: "/register" }, t("Register"))),
            React.createElement(Box, { flexGrow: 0 },
                React.createElement(Link, { component: L, to: "/forgot" }, t("Forgot your password?"))))));
}
