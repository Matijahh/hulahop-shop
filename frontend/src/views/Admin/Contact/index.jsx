import React, { useEffect, useState } from "react";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import Tables from "../../../components/SuperAdmin/Tables";
import { renderHeader } from "./mock";
import map from "lodash/map";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { size } from "lodash";
const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [inquiriesList, setInquiriesList] = useState([]);

  const getInquiriesList = async () => {
    setLoading(true);
    const response = await commonGetQuery("/inquiries");
    if (response) {
      const { data } = response.data;
      setInquiriesList(data);
      setLoading(false);
    }
    setLoading(false);
  };

  const setTableRenderData = (data) => {
    // setLoading(true);
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      id: item.id,
      name: item.name,
      email: item.email,
      mobile: item.mobile,
      subject: item.subject,
      message: item.message,
      handleDelete,
    }));
    // setLoading(false);

    return renderData;
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await commonAddUpdateQuery(
      `/inquiries/${id}`,
      null,
      "DELETE"
    );
    if (response) {
      getInquiriesList();
    }
    setLoading(false);
  };

  useEffect(() => {
    getInquiriesList();
  }, []);

  return (
    <CommonWhiteBackground>
      <FlexBox className="mb-4">
        <div className="main-title ">Users Queries</div>
      </FlexBox>
      <Tables
        body={size(inquiriesList) > 0 ? setTableRenderData(inquiriesList) : []}
        header={renderHeader}
      />
    </CommonWhiteBackground>
  );
};
export default Contact;
