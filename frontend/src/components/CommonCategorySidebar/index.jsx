import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import _size from "lodash/size";
import _get from "lodash/get";
import _map from "lodash/map";
import styled from "styled-components";

import { Loader } from "../Loader";
import ButtonComponent from "../ButtonComponent";
import SliderComponent from "../SliderComponent/SliderComponent";
import { commonGetQuery } from "../../utils/axiosInstance";
import { getImageUrlById } from "../../utils/commonFunctions";
import {
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP,
  ROUTE_MAIN_SHOP,
} from "../../routes/routes";
import { useTranslation } from "react-i18next";

const CommonCategorySidebar = ({ renderHeader, isAssociate }) => {
  const params = useParams();
  const navigation = useNavigate();
  const { t } = useTranslation();
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (id, subId) => {
    let url;
    if (isAssociate) {
      url =
        ROUTE_ASSOCIATE_BRAND_STORE_SHOP.replace(
          ":id",
          _get(params, "id")?.split("-")?.[1]
        ) + `?categoryId=${id || 0}&sub_categoryId=${subId || 0}`;
    } else {
      url =
        ROUTE_MAIN_SHOP + `?categoryId=${id || 0}&sub_categoryId=${subId || 0}`;
    }
    navigation(url);
  };

  const getProductsList = async () => {
    setLoading(true);
    const response = await commonGetQuery(`/categories`);
    setLoading(false);
    if (response) {
      const { data } = response.data;

      setCategoriesList(data);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);

  return (
    <div className="categories-section">
      <div className="container">
        <div className="row">
          {renderHeader ? (
            <>{renderHeader()}</>
          ) : (
            <div className="col-12">
              <div className="section-title-desc">
                <h2>{t("Category")}</h2>
                <p>{t("SELECT PRODUCTS CATEGORY")}</p>
              </div>
            </div>
          )}
          <div className="col-12">
            {loading && (
              <div className="d-flex justify-content-center align-items-center">
                <Loader></Loader>
              </div>
            )}
            {!loading && _size(categoriesList) > 0 ? (
              <>
                <div className="categories-slider">
                  <SliderComponent
                    dots={false}
                    arrows={true}
                    slidesToShow={
                      _size(categoriesList) > 4 ? 4 : _size(categoriesList)
                    }
                  >
                    {_map(categoriesList, (item, key) => (
                      <div className="categories-slide" key={key}>
                        <div
                          className="categories-box"
                          style={{
                            backgroundImage: `url(${getImageUrlById(
                              _get(item, "image_id", null)
                            )})`,
                          }}
                        >
                          <div className="category-overlay">
                            <p className="category-name">
                              {t(_get(item, "name", null))}
                            </p>
                            <ButtonComponent
                              text="View All"
                              variant=" "
                              className="category-view-btn"
                              onClick={() => toggleCategory(item.id)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </SliderComponent>
                </div>
              </>
            ) : (
              <center className="py-5">
                <b>No Product Found!</b>
              </center>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonCategorySidebar;
