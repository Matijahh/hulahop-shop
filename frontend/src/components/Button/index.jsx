import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const ButtonComponent = (props) => {
  const { variant, startIcon, text, onClick } = props;
  const { t } = useTranslation();

  return (
    <Button variant={variant} startIcon={startIcon} onClick={onClick}>
      {t(text)}
    </Button>
  );
};

export default ButtonComponent;
