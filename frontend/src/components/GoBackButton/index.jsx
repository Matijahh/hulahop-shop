import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ButtonComponent from "../ButtonComponent";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

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
