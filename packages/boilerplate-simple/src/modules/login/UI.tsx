import { useGlobalState } from "@wugui/hooks";
import { Link, usePathname } from "@wugui/plugin-router";
import { Box, Button, TextInput } from "grommet";
import { FormLock, Login, View } from "grommet-icons";
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
      <Box
        width="medium"
        direction="row"
        margin="large"
        align="center"
        round="small"
        border
      >
        <TextInput
          plain
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </Box>
      <Box
        width="medium"
        direction="row"
        margin="large"
        align="center"
        round="small"
        border
      >
        <TextInput
          plain
          type={reveal ? "text" : "password"}
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <Button
          icon={reveal ? <View size="medium" /> : <FormLock size="medium" />}
          onClick={() => setReveal(!reveal)}
        />
      </Box>
      <Box>
        <Button
          icon={<Login />}
          label="Login"
          onClick={handleSubmit}
        />
        <Link to="/register">Register</Link>
      </Box>
    </>
  );
}
