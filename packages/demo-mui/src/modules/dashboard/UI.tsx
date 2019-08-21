import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useT } from "@spax/i18n";
import { Carrier, Link } from "@spax/router";
import React, { ReactNode, useState } from "react";

const useStyles = makeStyles({
  root: {
    fontSize: "24px",
    textAlign: "center",
  },
});

const dynamicSeeds = [
  { path: "foo", component: () => <p>foo</p> },
  { path: "bar", component: () => <p>bar</p> },
  { path: "baz", component: () => <p>baz</p> },
];

export default function UI(props: any): ReactNode {
  const { root } = useStyles(props);
  const { t } = useT();
  const [dynamic, setDynamic] = useState(null);

  function toggleDynamic() {
    setDynamic(dynamicSeeds.filter(() => Math.random() > 0.5));
  }

  return (
    <Box>
      <pre className={root}>{t(props.description)}</pre>
      <Button onClick={toggleDynamic}>Toggle Dynamic</Button>
      <pre>{JSON.stringify(dynamic, null, 2)}</pre>
      <ul>
      {dynamic ? dynamic.map((d) => (
        <li key={d.path}>
          <Link to={`/dashboard/${d.path}`}>{d.path}</Link>
        </li>
      )) : null}
      </ul>
      <Carrier
        {...props}
        $$modules={dynamic}
        />
    </Box>
  );
}
