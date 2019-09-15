import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useT } from "@spax/i18n";
import { Link, useMatchedFromChildBocksOnTheFly } from "@spax/router";
import React, { useState } from "react";
const useStyles = makeStyles({
    root: {
        fontSize: "24px",
        textAlign: "center",
    },
});
const blocksCandidates = [
    { path: "foo", title: "Foo", component: () => React.createElement("p", null, "foo") },
    { path: "bar", title: "Bar", component: () => React.createElement("p", null, "bar") },
    { path: "baz", title: "Baz", component: () => React.createElement("p", null, "baz") },
    { path: "qux", title: "Qux", component: () => React.createElement("p", null, "qux") },
];
export default function UI(props) {
    const { root } = useStyles(props);
    const [t] = useT();
    const [blocksOnTheFly, setBlocksOnTheFly] = useState(null);
    const BlocksMatchedOnTheFly = useMatchedFromChildBocksOnTheFly(props, blocksOnTheFly);
    function toggleBlocksOnTheFly() {
        setTimeout(() => {
            setBlocksOnTheFly(blocksCandidates.filter(() => Math.random() > 0.5));
        }, 500);
    }
    return (React.createElement(Box, null,
        React.createElement("pre", { className: root }, t(props.description)),
        React.createElement(Button, { onClick: toggleBlocksOnTheFly }, "Toggle BlocksOnTheFly"),
        React.createElement("pre", null, JSON.stringify(blocksOnTheFly, null, 2)),
        React.createElement("ul", null, blocksOnTheFly ? blocksOnTheFly.map((d) => (React.createElement("li", { key: d.path },
            React.createElement(Link, { to: `/dynamic/${d.path}` }, d.path)))) : null),
        React.createElement(BlocksMatchedOnTheFly, null)));
}
