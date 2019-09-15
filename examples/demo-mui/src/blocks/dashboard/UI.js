import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { runParse } from "@spax/core";
import { useT } from "@spax/i18n";
import React from "react";
const useStyles = makeStyles({
    root: {
        fontSize: "24px",
        textAlign: "center",
    },
});
const blocksOnTheFly = [
    { title: "Home", component: () => React.createElement("p", null, "Home") },
    { path: "foo", title: "Foo", component: () => React.createElement("p", null, "foo") },
    { path: "bar", title: "Bar", component: () => React.createElement("p", null, "bar") },
    { path: "baz", title: "Baz", component: () => React.createElement("p", null, "baz") },
    { path: "qux", title: "Qux", component: () => React.createElement("p", null, "qux") },
    { path: "*", title: "Not Found", component: () => React.createElement("p", null, "Star") },
];
export default function UI(props) {
    const { root } = useStyles(props);
    const [t] = useT();
    function updateBlocks() {
        setTimeout(() => {
            runParse(blocksOnTheFly);
        }, 500);
    }
    return (React.createElement(Box, { textAlign: "center" },
        React.createElement(Box, null,
            React.createElement("pre", { className: root }, t(props.description))),
        React.createElement(Box, { mt: 2 },
            React.createElement(Button, { variant: "contained", onClick: updateBlocks }, "Update Blocks On the Fly"))));
}
