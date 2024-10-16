import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { get, map, size } from "lodash";

import {
  ROUTE_ASSOCIATE_BRAND_STORE_BLOGS_ID,
  ROUTE_MAIN_BLOG_SINGLE,
} from "../../../../routes/routes";
import { getImageUrlById } from "../../../../utils/commonFunctions";
import { commonGetQuery } from "../../../../utils/axiosInstance";
import SliderSecction from "../Home/SliderSecction";
import { HomeContainer } from "../Home/styled";

const ShopBlog = ({ isAssociateProduct, storeData }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [blogSlider, setBlogSlider] = useState([]);
  const { t } = useTranslation();

  const getBlogList = async () => {
    setLoading(true);
    const response = await commonGetQuery(
      `/associate_blogs/store/${storeData?.id ?? 0}`
    );
    if (response) {
      const { data } = response.data;
      setBlogList(data);
      setLoading(false);
    }
    setLoading(false);
  };

  const getBlogSliderList = async () => {
    setLoading(true);
    const response = await commonGetQuery("/blog_page_slider");
    if (response) {
      const { data } = response.data;
      setBlogSlider(data);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    //getBlogSliderList();
    getBlogList();
  }, []);

  return (
    <HomeContainer>
      <Helmet>
        <title>{t("Blogs - HulaHop")}</title>
      </Helmet>

      <SliderSecction data={storeData} />

      <div className="blog-listing-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-12">
              <div className="hero-section m-0">
                <h3 className="banner-head">{t("Latest Posts")}</h3>
              </div>
            </div>
            {size(blogList) > 0 &&
              map(blogList, (item, key) => {
                return (
                  <div className="col-md-6 col-lg-4" key={key}>
                    <div className="blog-card-wrapper">
                      <div
                        className="blog-card"
                        onClick={() => {
                          get(params, "id", null)
                            ? navigate(
                                ROUTE_ASSOCIATE_BRAND_STORE_BLOGS_ID.replace(
                                  ":id",
                                  get(params, "id", null)
                                ).replace(":blogId", item.id)
                              )
                            : navigate(
                                ROUTE_MAIN_BLOG_SINGLE.replace(":id", item.id)
                              );
                        }}
                      >
                        <div className="blog-feature-img">
                          <img
                            src={getImageUrlById(get(item, "image_id"))}
                            alt=""
                          />
                        </div>
                        <div className="blog-card-content">
                          <div className="blog-card-description">
                            <h2 className="blog-name">
                              {get(item, "heading")}
                            </h2>
                            <p className="blog-detail">
                              {parse(get(item, "content"))}
                            </p>
                          </div>
                          <div className="blog-card-footer">
                            <p className="blog-auther-name">Velimir Stupar</p>
                            <p className="blog-post-date">
                              {moment(
                                Number(get(item, "created_at", ""))
                              ).format("MMMM, DD,YYYY")}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </HomeContainer>
  );
};

const mapStateToProps = (state) => ({
  storeData: state.user.storeData,
});

export default connect(mapStateToProps, null)(ShopBlog);
