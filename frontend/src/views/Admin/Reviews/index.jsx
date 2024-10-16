import React from "react";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import muska3 from "../../../assets/images/muska-3.jpg";
import Tables from "../../../components/SuperAdmin/Tables";
import { renderHeader } from "./mock";
import map from "lodash/map";
const Reviews = () => {
  const renderData = map(Array(10), (item, index) => ({
    ...item,
    no: `${index + 1}`,
    user_name: "Demo User",
    product_name: "Red T-shirt",
    product_image: muska3,
    user_review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    id: 101 * index,
    date: "02/10/2023",
    status: "Show",
  }));
  return (
    <CommonWhiteBackground>
      <FlexBox className="mb-4">
        <div className="main-title ">Reviews</div>
      </FlexBox>
      <Tables body={renderData} header={renderHeader} />
    </CommonWhiteBackground>
  );
};

export default Reviews;
