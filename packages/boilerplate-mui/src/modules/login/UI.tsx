import { Box, Button, Link as L, TextField } from "@material-ui/core";
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
      <Box>
        <Box>
          <TextField
            placeholder="admin or guest"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </Box>
        <Box>
          <TextField
            type={reveal ? "text" : "password"}
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <Button
            onClick={() => setReveal(!reveal)}
          >{reveal ? <Visibility /> : <VisibilityOff />}</Button>
        </Box>
        <Box>
          <Button
            onClick={handleSubmit}
          ><Fingerprint /> Login</Button>
        </Box>
        <Box>
          <Link as={L} to="/register">注册</Link>
          <Link as={L} to="/forgot">忘记密码？</Link>
        </Box>
      </Box>
    </>
  );
}
