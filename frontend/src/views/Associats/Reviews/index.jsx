import React from "react";
import { map } from "lodash";

import Tables from "../../../components/SuperAdmin/Tables";
import InputComponent from "../../../components/InputComponent";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { renderHeader } from "./mock";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Reviews = () => {
  const { t } = useTranslation();

  const renderData = map(Array(10), (item, index) => ({
    ...item,
    no: `${index + 1}`,
    id: 101 * index,
    review_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    review_date: "02/10/2023",
    created_by: "Chirag Rathod",
  }));
  return (
    <CommonWhiteBackground>
      <Helmet>
        <title>{t("Reviews - Associate")}</title>
      </Helmet>
      <FlexBox className="mb-4" isWrap>
        <div className="main-title ">Reviews</div>
        <InputComponent type="search" label="Search orders" />
      </FlexBox>
      <Tables body={renderData} header={renderHeader} maxHeight="650px" />
    </CommonWhiteBackground>
  );
};
export default Reviews;
