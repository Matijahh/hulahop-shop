import React, { useEffect, useState } from "react";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import muska1 from "../../../assets/images/muska-1.jpg";
import muska2 from "../../../assets/images/muska-2.jpg";
import muska3 from "../../../assets/images/muska-3.jpg";
import muska4 from "../../../assets/images/muska-4.jpg";
import muska5 from "../../../assets/images/muska-5.jpg";
import muskes from "../../../assets/images/muskes.jpg";
import muskem from "../../../assets/images/muskem.jpg";
import muskel from "../../../assets/images/muskel.jpg";
import muskexl from "../../../assets/images/muskexl.jpg";
import muskexxl from "../../../assets/images/muskexxl.jpg";
import muske3xl from "../../../assets/images/muske3xl.jpg";
import sizeChart from "../../../assets/images/size-chart.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { get, map, size } from "lodash";
import { getImageUrlById } from "../../../utils/commonFunctions";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";

const AboutProducts = (props) => {
  const { t } = useTranslation();
  const lang = localStorage.getItem("I18N_LANGUAGE") || "en";

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [aboutProductsData, setAboutProductsData] = useState();
  const getAboutProductsData = async (sub_categoryId) => {
    setLoading(true);
    let url = "about-product-data";

    if (sub_categoryId && sub_categoryId != 0) {
      url = `${url}?subcategory_id=${sub_categoryId}`;
    }

    const response = await commonGetQuery(url);
    if (response) {
      const { data } = response.data;
      setAboutProductsData(data);
      setLoading(false);
    }
    setLoading(false);
  };
  // const url = new URL(window.location.href);
  useEffect(() => {
    const url = new URL(window.location.href);
    // const categoryId = url.searchParams.get("categoryId");
    const sub_categoryId = url.searchParams.get("sub_categoryId");
    getAboutProductsData(sub_categoryId);
  }, [params]);
  return (
    <div className="page-wrapper about-products-page ">
      <Helmet>
        <title>{t("About Products - HulaHop")}</title>
      </Helmet>
      <div className="banner-slider-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">
                  {t(get(aboutProductsData, "0.sub_category.name"))}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="products-banner-slider">
          <SliderComponent
            dots={false}
            slidesToShow={
              size(get(aboutProductsData, "0.about_product_top_bar_image")) > 4
                ? 4
                : size(get(aboutProductsData, "0.about_product_top_bar_image"))
            }
          >
            {size(get(aboutProductsData, "0.about_product_top_bar_image")) >
              0 &&
              map(
                get(aboutProductsData, "0.about_product_top_bar_image"),
                (item, index) => {
                  return (
                    <div className="products-slide">
                      <div className="products-slide-flexbox">
                        <div
                          className="product-image-box"
                          style={{
                            backgroundImage: `url(${getImageUrlById(
                              item.top_bar_images_id
                            )})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
          </SliderComponent>
        </div>
      </div>
      <div className="about-product-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("About Our Product")}</h3>
                {/* <p className="banner-pera">
                  Sewn on the side, standard model, double stitches on the
                  render, sleeves and bottom. Stitched side edges, which avoids
                  deformation and twisting after washing.
                </p> */}
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="about-product-desciption">
                <div className="description-box">
                  {lang == "sr"
                    ? get(aboutProductsData, "0.product_description_1_ab") &&
                      parse(
                        get(aboutProductsData, "0.product_description_1_ab")
                      )
                    : get(aboutProductsData, "0.product_description_1") &&
                      parse(get(aboutProductsData, "0.product_description_1"))}
                </div>
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="about-product-desciption">
                <div className="description-box white-box">
                  {lang == "sr"
                    ? get(aboutProductsData, "0.product_description_2_sb") &&
                      parse(
                        get(aboutProductsData, "0.product_description_2_sb")
                      )
                    : get(aboutProductsData, "0.product_description_2") &&
                      parse(get(aboutProductsData, "0.product_description_2"))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="footer-slider-section">
        <div className="products-banner-slider">
          <SliderComponent dots={false} slidesToShow={4}>
            <div className="products-slide">
              <div className="products-slide-flexbox">
                <div
                  className="product-image-box"
                  style={{
                    backgroundImage: `url(${muska1})`,
                  }}
                >
                  <div className="products-overlay">
                    <p className="products-name">Sky T-shirt</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="products-slide">
              <div className="products-slide-flexbox">
                <div
                  className="product-image-box"
                  style={{
                    backgroundImage: `url(${muska2})`,
                  }}
                >
                  <div className="products-overlay">
                    <p className="products-name">Yellow T-shirt</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="products-slide">
              <div className="products-slide-flexbox">
                <div
                  className="product-image-box"
                  style={{
                    backgroundImage: `url(${muska3})`,
                  }}
                >
                  <div className="products-overlay">
                    <p className="products-name">Red T-shirt</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="products-slide">
              <div className="products-slide-flexbox">
                <div
                  className="product-image-box"
                  style={{
                    backgroundImage: `url(${muska4})`,
                  }}
                >
                  <div className="products-overlay">
                    <p className="products-name">Grey T-shirt</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="products-slide">
              <div className="products-slide-flexbox">
                <div
                  className="product-image-box"
                  style={{
                    backgroundImage: `url(${muska5})`,
                  }}
                >
                  <div className="products-overlay">
                    <p className="products-name">White T-shirt</p>
                  </div>
                </div>
              </div>
            </div>
          </SliderComponent>
        </div>
      </div> */}
      {size(get(aboutProductsData, "0.about_product_bottom_bar_images")) >
        0 && (
        <div className="products-banner-slider">
          <SliderComponent
            dots={false}
            slidesToShow={
              size(
                get(aboutProductsData, "0.about_product_bottom_bar_images")
              ) > 4
                ? 4
                : size(
                    get(aboutProductsData, "0.about_product_bottom_bar_images")
                  )
            }
          >
            {size(get(aboutProductsData, "0.about_product_bottom_bar_images")) >
              0 &&
              map(
                get(aboutProductsData, "0.about_product_bottom_bar_images"),
                (item, index) => {
                  return (
                    <div className="products-slide">
                      <div className="products-slide-flexbox">
                        <div
                          className="product-image-box"
                          style={{
                            backgroundImage: `url(${getImageUrlById(
                              item.bottom_bar_images_id
                            )})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
          </SliderComponent>
        </div>
      )}
      {size(get(aboutProductsData, "0.about_product_size_chart_image")) > 0 && (
        <div className="product-sizing-section">
          <div className="container">
            <div className="row g-3">
              <div className="col-12">
                <div className="hero-section">
                  <h3 className="banner-head">{t("Product Size Chart")}</h3>
                  <p className="banner-pera">
                    {t(
                      "Hulahop offers a wide range of products, and each category may have different sizes available. To assist you in selecting the perfect fit, we recommend consulting the size charts below, specifically designed for Hulahop products. Explore all the options and find the ideal size for you!"
                    )}
                  </p>
                </div>
              </div>
              {/* <div className="col-lg-4 align-self-center">
              <div className="size-chart-img">
                <img src={sizeChart} alt="" />
              </div>
            </div>
            <div className="col-lg-8 align-self-center">
              <div className="size-chart-table">
                <Table sx={{ minWidth: 550 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">SIZE</TableCell>
                      <TableCell align="center">LENGTH</TableCell>
                      <TableCell align="center">WIDTH</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">S</TableCell>
                      <TableCell align="center">69</TableCell>
                      <TableCell align="center">50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">M</TableCell>
                      <TableCell align="center">71</TableCell>
                      <TableCell align="center">52</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">L</TableCell>
                      <TableCell align="center">74</TableCell>
                      <TableCell align="center">54</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">XL</TableCell>
                      <TableCell align="center">76</TableCell>
                      <TableCell align="center">57</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">XXL</TableCell>
                      <TableCell align="center">79</TableCell>
                      <TableCell align="center">59.5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">XXXL</TableCell>
                      <TableCell align="center">82</TableCell>
                      <TableCell align="center">63</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div> */}
              <div className="col-12">
                <div className="size-slider">
                  <SliderComponent
                    dots={false}
                    slidesToShow={
                      size(
                        get(
                          aboutProductsData,
                          "0.about_product_size_chart_image"
                        )
                      ) > 4
                        ? 4
                        : size(
                            get(
                              aboutProductsData,
                              "0.about_product_size_chart_image"
                            )
                          )
                    }
                  >
                    {size(
                      get(aboutProductsData, "0.about_product_size_chart_image")
                    ) > 0 &&
                      map(
                        get(
                          aboutProductsData,
                          "0.about_product_size_chart_image"
                        ),
                        (item, index) => {
                          return (
                            <div className="size-slide">
                              <div className="size-slide-flexbox">
                                <div
                                  className="size-image-box"
                                  style={{
                                    backgroundImage: `url(${getImageUrlById(
                                      item.size_chart_image_id
                                    )})`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </SliderComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutProducts;
