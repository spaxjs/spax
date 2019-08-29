import { Box, Button, IconButton, InputAdornment, Link as L, TextField } from "@material-ui/core";
import { Fingerprint, Visibility, VisibilityOff } from "@material-ui/icons";
import { usePathname } from "@spax/history";
import { useT } from "@spax/i18n";
import { Link } from "@spax/router";
import React, { useEffect, useState } from "react";
import { useStore } from "store";

export default function UI(props: any) {
  const [role, setRole] = useStore<string>("role");
  const [, setPath] = usePathname();
  const { t } = useT("Theme");

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [reveal, setReveal] = useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (username && password) {
      setRole(username);
    } else {
      alert("Please input username!");
    }
  }

  useEffect(() => {
    if (role) {
      setPath("/");
    }
  }, [role, setPath]);

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label={t("Account")}
        placeholder="admin or guest"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label={t("Password")}
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
        ><Fingerprint /> {t("Login")}</Button>
      </Box>
      <Box
        display="flex"
        flexDirection="row">
        <Box flexGrow={1}>
          <Link component={L} to="/register">{t("Register")}</Link>
        </Box>
        <Box flexGrow={0}>
          <Link component={L} to="/forgot">{t("Forgot your password?")}</Link>
        </Box>
      </Box>
    </>
  );
}
