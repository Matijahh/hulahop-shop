import React from "react";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import InputComponent from "../../../components/InputComponent";
import muska4 from "../../../assets/images/muska-4.jpg";
import Tables from "../../../components/SuperAdmin/Tables";
import { renderHeader } from "./mock";
import map from "lodash/map";

const RreturnedProducts = () => {
  const renderData = map(Array(10), (item, index) => ({
    ...item,
    no: `${index + 1}`,
    user_name: "Demo User",
    product_name: "Blue T-Shirt",
    product_image: muska4,
    product_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    reason: "Dolor sit amet consectetur adipisicing elit.",
    id: 101 * index,
    price: 1200,
    category: "T-shirt",
    order_date: "02/10/2023",
    returned_date: "07/10/2023",
    qty: "2",
    status: "Returned",
  }));
  return (
    <CommonWhiteBackground>
      <FlexBox className="mb-4">
        <div className="main-title ">Rreturned Products</div>

        <InputComponent type="search" label="Search orders" />
      </FlexBox>
      <Tables body={renderData} header={renderHeader} />
    </CommonWhiteBackground>
  );
};

export default RreturnedProducts;
