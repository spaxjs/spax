import { Typography } from "@material-ui/core";
import { useT } from "@spax/i18n";
import React from "react";

export const Slogan: React.FC<{}> = () => {
  const { t } = useT("Theme");
  return (
    <Typography variant="subtitle1">
      {t("slogan")}
    </Typography>
  );
};
