import { Box, Card, CardActions, CardContent, Divider, Link as L, Typography } from "@material-ui/core";
import { Link } from "@spax/router";
import React from "react";
export default function NotFound(props) {
    return (React.createElement(Card, null,
        React.createElement(CardContent, null,
            React.createElement(Typography, { variant: "h3" }, "404 from blocks/nested"),
            React.createElement(Typography, { variant: "body1" }, "Sorry, the page you visited does not exist.")),
        React.createElement(Divider, null),
        React.createElement(CardActions, null,
            React.createElement(Box, { p: 1 },
                React.createElement(Link, { component: L, to: "/nested" }, "Nested")))));
}
