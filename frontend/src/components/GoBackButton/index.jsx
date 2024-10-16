import React from "react";
import ButtonComponent from "../ButtonComponent";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useTranslation } from "react-i18next";

const GobackButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <ButtonComponent
      text={t("BACK")}
      startIcon={<ArrowBackOutlinedIcon />}
      variant="outlined"
      className="mb-3"
      onClick={() => navigate(-1)}
    />
  );
};

export default GobackButton;
