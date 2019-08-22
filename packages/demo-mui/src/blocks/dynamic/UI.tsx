import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { IBlock } from "@spax/core";
import { useT } from "@spax/i18n";
import { Link, useBlocksOnTheFly } from "@spax/router";
import React, { ReactNode, useState } from "react";

const useStyles = makeStyles({
  root: {
    fontSize: "24px",
    textAlign: "center",
  },
});

const blocksCandidates = [
  { path: "foo", title: "Foo", component: () => <p>foo</p> },
  { path: "bar", title: "Bar", component: () => <p>bar</p> },
  { path: "baz", title: "Baz", component: () => <p>baz</p> },
  { path: "qux", title: "Qux", component: () => <p>qux</p> },
];

export default function UI(props: any): ReactNode {
  const { root } = useStyles(props);
  const { t } = useT();
  const [blocksOnTheFly, setBlocksOnTheFly] = useState(null);
  const BlocksMatchedOnTheFly = useBlocksOnTheFly(props, blocksOnTheFly);

  function toggleBlocksOnTheFly() {
    setTimeout(() => {
      setBlocksOnTheFly(blocksCandidates.filter(() => Math.random() > 0.5));
    }, 500);
  }

  return (
    <Box>
      <pre className={root}>{t(props.description)}</pre>
      <Button onClick={toggleBlocksOnTheFly}>Toggle BlocksOnTheFly</Button>
      <pre>{JSON.stringify(blocksOnTheFly, null, 2)}</pre>
      <ul>
        {blocksOnTheFly ? blocksOnTheFly.map((d: IBlock) => (
          <li key={d.path}>
            <Link to={`/dynamic/${d.path}`}>{d.path}</Link>
          </li>
        )) : null}
      </ul>
      <BlocksMatchedOnTheFly />
    </Box>
  );
}
