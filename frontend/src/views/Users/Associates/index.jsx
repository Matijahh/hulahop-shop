import React, { useEffect, useState } from "react";

import associate1 from "../../../assets/images/associate1.jpg";
import associate2 from "../../../assets/images/associate2.jpg";
import associate3 from "../../../assets/images/associate3.jpg";
import associate4 from "../../../assets/images/associate4.jpg";
import associate5 from "../../../assets/images/associate5.jpg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { get, isEmpty, map, size } from "lodash";
import { getImageUrlById, slugify } from "../../../utils/commonFunctions";
import {
  ROUTE_ASSOCIATE_BRAND_STORE,
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP_SINGLE_VIEW,
} from "../../../routes/routes";
import { Helmet } from "react-helmet";

const Associates = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [associatesList, setAssociatesList] = useState([]);
  const { t } = useTranslation();

  const getAssociatesList = async () => {
    setLoading(true);
    const response = await commonGetQuery("/associates");
    if (response) {
      const { data } = response.data;
      const filteredData = data.filter(
        (item) => size(item.store_layout_details) > 0
      );
      setAssociatesList(filteredData);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAssociatesList();
  }, []);
  return (
    <div className="page-wrapper associates-page">
      <Helmet>
        <title>{t("Associates List - HulaHop")}</title>
      </Helmet>
      <div className="associates-list-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head m-0">{t("Our Associates")}</h3>
              </div>
            </div>
          </div>
          <div className="row g-5">
            {size(associatesList) > 0 &&
              map(associatesList, (item, index) => {
                return (
                  <>
                    {/* {!isEmpty(get(item, "store_layout_details", [])) &&
                  size(get(item, "store_layout_details", [])) > 0 ? ( */}
                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                      <div
                        className="assosiate-box"
                        role="button"
                        onClick={() => {
                          const name = get(
                            item,
                            "store_layout_details.0.name",
                            null
                          );
                          const id = get(
                            item,
                            "store_layout_details.0.user_id",
                            null
                          );

                          window.location.replace(
                            ROUTE_ASSOCIATE_BRAND_STORE.replace(
                              ":id",
                              slugify(name, id)
                            )
                          );
                        }}
                      >
                        <div className="assosiate-img-box">
                          <img
                            src={getImageUrlById(
                              size(get(item, "store_layout_details", [])) > 0
                                ? get(
                                    item,
                                    "store_layout_details.0.logo_image",
                                    ""
                                  )
                                : get(item, "image_id", "")
                                ? get(item, "image_id", "")
                                : "ae7a4e77-e53c-488f-95c4-4af8390822db"
                            )}
                            alt=""
                          />
                        </div>
                        <div className="assosiate-description">
                          <h5>
                            {size(get(item, "store_layout_details", [])) > 0
                              ? get(item, "store_layout_details.0.name", "")
                              : get(item, "first_name", "") +
                                " " +
                                get(item, "last_name", "")}
                          </h5>
                          <p>
                            {size(get(item, "store_layout_details", [])) > 0
                              ? get(
                                  item,
                                  "store_layout_details.0.description",
                                  ""
                                )
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* ) : null} */}
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Associates;
