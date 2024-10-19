import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { renderHeader } from "./mock";
import { size } from "lodash";
import {
  ROUTE_ADMIN_COLORS_ADD,
  ROUTE_ADMIN_COLORS_EDIT,
} from "../../../routes/routes";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import map from "lodash/map";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";

import Tables from "../../../components/SuperAdmin/Tables";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";

const Colors = () => {
  const [loading, setLoading] = useState(false);
  const [colorList, setColorList] = useState([]);

  const navigation = useNavigate();
  const { t } = useTranslation();

  const getColorList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/colors");

    if (response) {
      const { data } = response.data;
      setColorList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      color_code: item?.code,
      color_name: item.name,
      id: item.id,
      status: item.status ? t("Active") : t("Inactive"),
      handleDelete,
      EditColor,
    }));

    return renderData;
  };

  const handleDelete = async (id) => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/colors/${id}`,
      null,
      "DELETE"
    );

    if (response) {
      getColorList();
    }

    setLoading(false);
  };

  const EditColor = (id) => {
    let route = ROUTE_ADMIN_COLORS_EDIT.replace(":id", id);
    navigation(route);
  };

  useEffect(() => {
    getColorList();
  }, []);

  return (
    <CommonWhiteBackground>
      <FlexBox className="mb-4">
        <div className="main-title ">{t("Colors")}</div>
        <FlexBox>
          <InputComponent type="search" label={t("Search orders")} />
          <ButtonComponent
            variant="contained"
            startIcon={<AddIcon />}
            text={t("Add Colors")}
            onClick={() => navigation(ROUTE_ADMIN_COLORS_ADD)}
          />
        </FlexBox>
      </FlexBox>
      {loading && <LoaderContainer />}
      <Tables
        body={size(colorList) > 0 ? setTableRenderData(colorList) : []}
        header={renderHeader.map((item) => ({
          ...item,
          headerName: t(item.headerName),
        }))}
      />
    </CommonWhiteBackground>
  );
};

export default Colors;
