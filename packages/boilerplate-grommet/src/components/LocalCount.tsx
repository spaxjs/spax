import { Box, Button, Heading } from "grommet";
import { Add, Subtract } from "grommet-icons/icons";
import React, { ReactElement, useState } from "react";

export default function LocalCount(props: any): ReactElement<void> {
  const [count, setCount] = useState(0);
  return (
    <>
      <Box className={props.className}>
        <Heading>{props.title}</Heading>
        <Button
          plain={false}
          icon={<Subtract />}
          onClick={() => setCount(prevCount => prevCount - 1)}
        />
        {count}
        <Button
          plain={false}
          icon={<Add />}
          onClick={() => setCount(prevCount => prevCount + 1)}
        />
      </Box>
      {props.children}
    </>
  );
}
