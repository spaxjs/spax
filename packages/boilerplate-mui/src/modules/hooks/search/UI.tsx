import { Box, Container, IconButton, TextField, Typography } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { useSearch } from "@wugui/history";
import React, { useState } from "react";

export default function UI(props: any) {
  const [search, setSearch] = useSearch();
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  function handleAdd() {
    setSearch({
      ...search,
      [newKey]: newValue,
    });
    setNewKey("");
    setNewValue("");
  }

  return (
    <Container>
      <Typography variant="h1">{props.description}</Typography>
      {
        Object.entries(search).map(([key, value]) =>
          <Box
            key={key}>
            <TextField
            label={key}
            value={value}
            onChange={(e) => setSearch({
              ...search,
              [key]: e.target.value,
            })} />
            <IconButton
              onClick={() => {
                const {...newSearch} = search;
                delete newSearch[key];
                setSearch(newSearch);
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
