import { FormControlLabel, Switch } from "@material-ui/core";
import { useT } from "@spax/i18n";
import { useType } from "@spax/theme";
import React from "react";

export const ThemeSwitch: React.FC<{}> = () => {
  const [ type, setType ] = useType();
  const [ t ] = useT();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={type === "dark"}
          onChange={() => setType(type === "light" ? "dark" : "light")}
          value="type"
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      }
      label={t(type === "dark" ? "Light On" : "Light Off")}
      labelPlacement="end"
    />
  );
};
