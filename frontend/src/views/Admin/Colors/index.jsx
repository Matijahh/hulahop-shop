import React, { useEffect, useState } from "react";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import Tables from "../../../components/SuperAdmin/Tables";
import { renderHeader } from "./mock";
import map from "lodash/map";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";
import {
  ROUTE_ADMIN_COLORS_ADD,
  ROUTE_ADMIN_COLORS_EDIT,
} from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { size } from "lodash";
import { LoaderContainer } from "../../../components/Loader";
const Colors = () => {
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);
  const [colorList, setColorList] = useState([]);

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
    // setLoading(true);
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      color_code: item?.code,
      color_name: item.name,
      id: item.id,
      status: item.status ? "Active" : "In Active",
      handleDelete,
      EditColor,
    }));
    // setLoading(false);

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
        <div className="main-title ">Colors</div>
        <FlexBox>
          <InputComponent type="search" label="Search orders" />
          <ButtonComponent
            variant="contained"
            startIcon={<AddIcon />}
            text="Add Colors"
            onClick={() => navigation(ROUTE_ADMIN_COLORS_ADD)}
          />
        </FlexBox>
      </FlexBox>
      {loading && <LoaderContainer />}
      <Tables
        body={size(colorList) > 0 ? setTableRenderData(colorList) : []}
        header={renderHeader}
      />
    </CommonWhiteBackground>
  );
};

export default Colors;
