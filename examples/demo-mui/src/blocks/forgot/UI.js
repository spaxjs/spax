import { Container, Typography } from "@material-ui/core";
import { Link } from "@spax/router";
import React from "react";
export default function UI(props) {
    return (React.createElement(Container, null,
        React.createElement(Typography, { variant: "h1" }, "Todo"),
        React.createElement(Link, { to: "/login" }, "Login")));
}
