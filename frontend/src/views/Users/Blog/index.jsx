import React, { useEffect, useState } from "react";
import inspiration from "../../../assets/images/inspiration.jpg";
import blog2 from "../../../assets/images/blog2.jpg";
import blog3 from "../../../assets/images/blog3.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  ROUTE_ASSOCIATE_BRAND_STORE_BLOGS_ID,
  ROUTE_MAIN_BLOG_SINGLE,
} from "../../../routes/routes";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { get, map, size } from "lodash";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import { getImageUrlById, slugify } from "../../../utils/commonFunctions";
import moment from "moment";
import { Helmet } from "react-helmet";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";

const Blog = ({ isAssociateProduct }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [blogSlider, setBlogSlider] = useState([]);
  const { t } = useTranslation();

  const getBlogList = async () => {
    setLoading(true);
    const response = await commonGetQuery("/blogs");
    if (response) {
      const { data } = response.data;
      setBlogList(data);
      setLoading(false);
    }
    setLoading(false);
  };

  const getAssociateBlogList = async () => {
    setLoading(true);
    const response = await commonGetQuery("/associate_blogs");
    if (response) {
      const { data } = response.data;
      setBlogList((prev) => [...prev, ...data]);
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
    getBlogSliderList();
    getBlogList();
    getAssociateBlogList();
  }, []);

  return (
    <div className="page-wrapper blog-listing-page ">
      <Helmet>
        <title>{t("Blogs - HulaHop")}</title>
      </Helmet>

      <div className="shop-hero-section">
        <div className="shop-slider">
          <SliderComponent dots={false} arrows={true} slidesToShow={1}>
            {size(blogSlider) > 0 &&
              map(blogSlider, (item, index) => {
                return (
                  <div className="product-slide">
                    <div
                      className="product-slide-box"
                      style={{
                        backgroundImage: `url(${getImageUrlById(
                          get(item, "image_id", "")
                        )})`,
                      }}
                    >
                      <div className="container">
                        {/* <img src={associate1} alt="" /> */}
                        <div className="description-box">
                          {/* <p className="category-name">Textiles</p> */}
                          <h5>{t(get(item, "description", ""))} </h5>
                          {/* <ButtonComponent
                    text="View Collection"
                    variant="outlined"
                    className="category-view-btn"
                  /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </SliderComponent>
        </div>
      </div>

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
                          if (item?.store) {
                            navigate(
                              ROUTE_ASSOCIATE_BRAND_STORE_BLOGS_ID.replace(
                                ":id",
                                slugify(item?.store?.name, item?.store?.id)
                              ).replace(":blogId", item?.id)
                            );
                            return;
                          }

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
    </div>
  );
};

export default Blog;
