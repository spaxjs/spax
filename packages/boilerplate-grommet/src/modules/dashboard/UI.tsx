import { Box, Heading, Meter, Stack, Text } from "grommet";
import React, { ReactNode, useState } from "react";

export default function UI(props: any): ReactNode {
  const [label, setLabel] = useState();
  const [active, setActive] = useState(0);

  return (
    <Box>
      <Heading>{props.title}</Heading>
      <Stack anchor="center">
        <Meter
          type="circle"
          background="light-2"
          values={[
            {
              label: "in use",
              value: 70,
              onHover: (over) => {
                setLabel(over ? "in use" : undefined);
                setActive(over ? 70 : 0);
              },
            },
            {
              label: "available",
              value: 30,
              onHover: (over) => {
                setLabel(over ? "available" : undefined);
                setActive(over ? 30 : 0);
              },
            },
          ]}
          size="small"
          thickness="medium"
        />
        <Box align="center">
          <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
            <Text size="xxlarge" weight="bold">
              {active || 100}
            </Text>
            <Text>GB</Text>
          </Box>
          <Text>{label || "total"}</Text>
        </Box>
      </Stack>
    </Box>
  );
}
