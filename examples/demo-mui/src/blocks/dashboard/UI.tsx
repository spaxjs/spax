import { Box, Button, makeStyles } from "@material-ui/core";
import { runParse } from "@spax/core";
import { useT } from "@spax/i18n";
import React, { ReactNode } from "react";

const useStyles = makeStyles({
  root: {
    fontSize: "24px",
    textAlign: "center",
  },
});

const blocksOnTheFly = [
  { title: "Home", component: () => <p>Home</p> },
  { path: "foo", title: "Foo", component: () => <p>foo</p> },
  { path: "bar", title: "Bar", component: () => <p>bar</p> },
  { path: "baz", title: "Baz", component: () => <p>baz</p> },
  { path: "qux", title: "Qux", component: () => <p>qux</p> },
  { path: "*", title: "Not Found", component: () => <p>Star</p> },
];

export default function UI(props: any): ReactNode {
  const { root } = useStyles(props);
  const [t] = useT();

  function updateBlocks() {
    setTimeout(() => {
      runParse(blocksOnTheFly);
    }, 500);
  }

  return (
    <Box
      textAlign="center">
      <Box>
        <pre className={root}>{t(props.description)}</pre>
      </Box>
      <Box
        mt={2}>
        <Button
          variant="contained"
          onClick={updateBlocks}
        >Update Blocks On the Fly</Button>
      </Box>
    </Box>
  );
}
