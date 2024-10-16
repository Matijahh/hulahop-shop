import React, { useEffect, useState } from "react";
import { get, map, size } from "lodash";
import { WishListHeader, renderHeader } from "./mock";

import ProfileComponent from ".";
import InputComponent from "../../../components/InputComponent";
import { FlexBox } from "../../../components/Sections";
import Tables from "../../../components/SuperAdmin/Tables";
import { useTranslation } from "react-i18next";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import moment from "moment";
import { ROUTE_MAIN_SHOP_PRODUCT } from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Wishlist = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [wishListData, setWishListData] = useState([]);
  const navigate = useNavigate();
  const getWishListData = async () => {
    setLoading(true);
    const response = await commonGetQuery("/wishlist");
    if (response) {
      const { data } = response.data;
      setWishListData(data);
      setLoading(false);
    }
    setLoading(false);
  };

  const setTableRenderData = (data) => {
    // setLoading(true);
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      id: get(item, "id", ""),
      associate_product_id: get(item, "associate_product_id", ""),
      price: get(item, "associate_product.price", ""),
      image: get(item, "associate_product.image_id", ""),
      ViewProduct,
      handleDelete,
    }));
    // setLoading(false);

    return renderData;
  };

  const ViewProduct = (id) => {
    let url = ROUTE_MAIN_SHOP_PRODUCT.replace(":id", id);
    navigate(url);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await commonAddUpdateQuery(
      `/wishlist/${id}`,
      null,
      "DELETE"
    );
    if (response) {
      getWishListData();
    }
    setLoading(false);
  };
  useEffect(() => {
    getWishListData();
  }, []);
  return (
    <ProfileComponent>
      <Helmet>
        <title>{t("Wishlist - HulaHop")}</title>
      </Helmet>
      <div className="order-box">
        <FlexBox className="mb-4">
          <div className="hero-section">
            <h3 className="banner-head">{t("Wishlist")}</h3>
          </div>

          {/* <InputComponent type="search" label="Search orders" /> */}
        </FlexBox>
        <Tables
          body={size(wishListData) > 0 ? setTableRenderData(wishListData) : []}
          header={WishListHeader}
        />
      </div>
    </ProfileComponent>
  );
};

export default Wishlist;
