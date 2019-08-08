import { Box, Container, IconButton, TextField, Typography } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { useHash } from "@wugui/plugin-router";
import React, { useState } from "react";

export default function UI(props: any) {
  const [hash, setHash] = useHash();
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  function handleAdd() {
    setHash({
      ...hash,
      [newKey]: newValue,
    });
    setNewKey("");
    setNewValue("");
  }

  return (
    <Container>
      <Typography variant="h1">{props.description}</Typography>
      {
        Object.entries(hash).map(([key, value]) =>
          <Box
            key={key}>
            <TextField
            label={key}
            value={value}
            onChange={(e) => setHash({
              ...hash,
              [key]: e.target.value,
            })} />
            <IconButton
              onClick={() => {
                const {...newHash} = hash;
                delete newHash[key];
                setHash(newHash);
              }}>
              <Remove />
            </IconButton>
          </Box>,
        )
      }
      <Box>
        <TextField
          label="Key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)} />
        <TextField
          label="Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)} />
        <IconButton
          disabled={!(newKey && newValue)}
          onClick={handleAdd}>
          <Add />
        </IconButton>
      </Box>
    </Container>
  );
}
