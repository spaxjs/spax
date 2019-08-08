import { Box, Button, IconButton, InputAdornment, Link as L, TextField } from "@material-ui/core";
import { Fingerprint, Visibility, VisibilityOff } from "@material-ui/icons";
import { useGlobalState } from "@wugui/hooks";
import { Link, usePathname } from "@wugui/plugin-router";
import React, { useEffect, useState } from "react";

export default function UI(props: any) {
  const [auth, setAuth] = useGlobalState<string>("auth");
  const [, setPath] = usePathname();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [reveal, setReveal] = useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (username && password) {
      setAuth(username);
    } else {
      alert("Please input username!");
    }
  }

  useEffect(() => {
    if (auth) {
      setPath("/");
    }
  }, [auth, setPath]);

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="用户"
        placeholder="admin or guest"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="密码"
        type={reveal ? "text" : "password"}
        value={password}
        onChange={event => setPassword(event.target.value)}
        InputProps={{endAdornment:
          <InputAdornment position="end">
            <IconButton
              onClick={() => setReveal(!reveal)}
            >{reveal ? <Visibility /> : <VisibilityOff />}</IconButton>
          </InputAdornment>,
        }}
      />
      <Box
        py={1}>
        <Button
          disabled={!(username && password)}
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        ><Fingerprint /> Login</Button>
      </Box>
      <Box
        display="flex"
        flexDirection="row">
        <Box flexGrow={1}>
          <Link component={L} to="/register">注册</Link>
        </Box>
        <Box flexGrow={0}>
          <Link component={L} to="/forgot">忘记密码？</Link>
        </Box>
      </Box>
    </>
  );
}
