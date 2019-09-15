import { MatchedChildBockOrChildren } from "@spax/router";
import LocalCount from "components/LocalCount";
import React from "react";
export default function UI(props) {
    return (React.createElement(LocalCount, { title: props.title },
        React.createElement(MatchedChildBockOrChildren, Object.assign({}, props))));
}
