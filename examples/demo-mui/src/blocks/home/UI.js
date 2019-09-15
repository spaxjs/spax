import { Box, Link as L, Typography } from "@material-ui/core";
import { Explore, NavigateNext } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useT } from "@spax/i18n";
import { Link } from "@spax/router";
import React from "react";
const useStyles = makeStyles({
    root: {
        "& > *": {
            verticalAlign: "middle",
        },
        "& > a": {
            fontSize: "24px",
        },
    },
});
export default function UI(props) {
    const { root } = useStyles(props);
    const [t] = useT();
    return (React.createElement(Box, { textAlign: "center" },
        React.createElement(Box, { mb: 2 },
            React.createElement(Typography, { variant: "h1" }, t(props.title))),
        React.createElement(Box, { className: root },
            React.createElement(Explore, null),
            React.createElement(NavigateNext, null),
            React.createElement(Link, { component: L, to: "/dashboard" }, t("Dashboard")))));
}
