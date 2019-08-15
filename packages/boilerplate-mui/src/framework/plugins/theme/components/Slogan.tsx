import { Typography } from "@material-ui/core";
import { useRes } from "@spax/i18n";
import React from "react";

export const Slogan: React.FC<{}> = () => {
  const { t } = useRes("Theme");
  return (
    <Typography variant="subtitle1">
      {t("slogan")}
    </Typography>
  );
};
