import { Link } from "@wugui/plugin-router";
import { Anchor, Box, Heading, WorldMap } from "grommet";
import { FormNextLink, Inspect } from "grommet-icons";
import React, { ReactNode, useState } from "react";

export default function UI(props: any): ReactNode {
  const [place, setPlace] = useState();

  return (
    <Box
      gap="medium"
      align="center">
      <Box
        round
        background="dark-1"
        pad="medium"
        gap="medium"
        align="center">
        <Heading
          margin="none"
          >{props.title}</Heading>
        <WorldMap
          color="brand"
          height="180px"
          continents={[
            {
              name: "Asia",
              color: "accent-1",
            },
          ]}
          onSelectPlace={setPlace}
          places={place ? [{ color: "neutral-1", location: place }] : undefined} />
      </Box>
      <Box
        direction="row"
        align="center">
        <Inspect />
        <FormNextLink />
        <Link
          as={Anchor}
          size="xlarge"
          to="/dashboard">Dashboard</Link>
      </Box>
    </Box>
  );
}
