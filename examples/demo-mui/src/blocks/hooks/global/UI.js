import { Box, Typography } from "@material-ui/core";
import GlobalCount from "components/GlobalCount";
import React from "react";
export default function UI(props) {
    return (React.createElement(Box, null,
        React.createElement(Typography, { variant: "h1" }, props.title),
        React.createElement(GlobalCount, Object.assign({}, props)),
        React.createElement(GlobalCount, Object.assign({}, props))));
}
