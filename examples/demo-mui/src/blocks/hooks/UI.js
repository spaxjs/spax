import { ArrowBack } from "@material-ui/icons";
import { MatchedChildBockOrChildren } from "@spax/router";
import React from "react";
const code = `<MatchedChildBockOrChildren {...props}>
  <ArrowBack fontSize="large" />
  请从左侧菜单进入子模块
</MatchedChildBockOrChildren>`;
export default function UI(props) {
    return (React.createElement(MatchedChildBockOrChildren, Object.assign({}, props),
        React.createElement(ArrowBack, { fontSize: "large" }),
        "\u8BF7\u4ECE\u5DE6\u4FA7\u83DC\u5355\u8FDB\u5165\u5B50\u6A21\u5757",
        React.createElement("pre", null, code)));
}
