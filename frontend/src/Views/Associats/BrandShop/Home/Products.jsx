import React, { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ButtonComponent from "../../../../components/ButtonComponent";
import _size from "lodash/size";
import _get from "lodash/get";
import _map from "lodash/map";

import { ProductsContainer } from "./styled";

import { commonGetQuery } from "../../../../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../../../components/Loader";
import { getImageUrlById, slugify } from "../../../../utils/commonFunctions";
import { ROUTE_ASSOCIATE_BRAND_STORE_SHOP_SINGLE_VIEW } from "../../../../routes/routes";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigation = useNavigate();
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductsList = async () => {
    setLoading(true);
    const response = await commonGetQuery(
      `/associate_products?user_id=${id?.split("-")?.[1]}`
    );
    setLoading(false);
    if (response) {
      const { data } = response.data;
      setProductsList(data);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);

  return (
    <ProductsContainer className=" product-list-section">
      <div className="section-title-desc">
        <h2>{t("Look")}</h2>
        <p>{t("OUR BEST SELLING PRODUCTS")}</p>
      </div>
      <div className="container">
        <div className="products-list-container">
          {loading && (
            <div className="d-flex justify-content-center align-items-center">
              <Loader></Loader>
            </div>
          )}

          {!loading && _size(productsList) > 0 ? (
            <>
              <div className="row gy-5">
                {_map(productsList, (item, key) => (
                  <div className="col-md-6 col-lg-3" key={key}>
                    <div
                      className="product-wrapper"
                      onClick={() =>
                        navigation(
                          ROUTE_ASSOCIATE_BRAND_STORE_SHOP_SINGLE_VIEW.replace(
                            ":sId",
                            id
                          ).replace(":id", slugify(item?.name, item?.id))
                        )
                      }
                    >
                      <div className="product-box">
                        <div className="product-img">
                          <img
                            src={getImageUrlById(_get(item, "image_id"))}
                            alt=""
                          />
                        </div>
                        <div className="prodoct-content">
                          <div className="content-heder">
                            <h6>{_get(item, "name", "")}</h6>
                            <div className="whishlist-btn">
                              <FavoriteBorderOutlinedIcon />
                            </div>
                          </div>
                          <div className="product-description">
                            <p className="product-price">1800 DIN</p>
                            <p className="product-category  ">
                              {`${_get(
                                item,
                                "product.category.name",
                                ""
                              )}, ${_get(
                                item,
                                "product.sub_category.name",
                                ""
                              )}`}
                            </p>
                          </div>
                          <div className="product-buy-button">
                            <ButtonComponent
                              text={t("BUY NOW")}
                              variant="outlined"
                              className="buy-btn"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <center className="py-5">
              <b>{t("No Product Found!")}</b>
            </center>
          )}
        </div>
      </div>
    </ProductsContainer>
  );
};

export default Products;
