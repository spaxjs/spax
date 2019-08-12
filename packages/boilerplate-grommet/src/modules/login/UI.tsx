import { usePathname } from "@wugui/history";
import { useGlobalState } from "@wugui/hooks";
import { Link } from "@wugui/router";
import { Anchor, Box, Button, FormField, Grid, TextInput } from "grommet";
import { FormLock, Login, View } from "grommet-icons";
import React, { useEffect, useState } from "react";

const suggestions = ["admin", "guest"];

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
        direction="column"
        gap="small"
      >
        <FormField
          label="用户"
          required
          validate={{ regexp: /^[a-z]{4,20}$/, message: "4-20 位小写字母" }}>
          <Box
            pad="xsmall"
            border>
            <TextInput
              plain
              placeholder="admin or guest"
              value={username}
              onChange={event => setUsername(event.target.value)}
              onSelect={event => setUsername(event.suggestion)}
              suggestions={suggestions}
            />
          </Box>
        </FormField>
        <FormField
          label="密码"
          required
          validate={{ regexp: /^[a-z0-9]{4,20}$/i, message: "4-20 位字母或数字" }}>
          <Box
            direction="row"
            pad="xsmall"
            border>
            <TextInput
              plain
              type={reveal ? "text" : "password"}
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <Button
              plain
              icon={reveal ? <View size="medium" /> : <FormLock size="medium" />}
              onClick={() => setReveal(!reveal)}
            />
          </Box>
        </FormField>
        <Box
          height="xxsmall">
          <Button
            fill
            primary
            icon={<Login />}
            label="Login"
            onClick={handleSubmit}
          />
        </Box>
        <Grid
          columns={["flex", "auto"]}
          margin={{top: "xxsmall"}}>
          <Link as={Anchor} to="/register">注册</Link>
          <Link as={Anchor} to="/forgot">忘记密码？</Link>
        </Grid>
      </Box>
    </>
  );
}
