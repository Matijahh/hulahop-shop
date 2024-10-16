import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { GiReceiveMoney } from "react-icons/gi";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { get, map, size } from "lodash";
import cx from "classnames";
import parse from "html-react-parser";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BiLogoFacebook, BiLogoPinterest } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

import Textiles from "../../../assets/images/Textiles.jpg";
import NotebooksPencils from "../../../assets/images/NotebooksPencils.jpg";
import Umbrellas from "../../../assets/images/Umbrellas.jpg";
import Paintings from "../../../assets/images/Paintings.jpg";
import Cups from "../../../assets/images/Cups.jpg";
import Bags from "../../../assets/images/Bags.jpg";

import ButtonComponent from "../../../components/ButtonComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import Category from "../../../components/Category/Category";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { getImageUrlById } from "../../../utils/commonFunctions";
import GobackButton from "../../../components/GoBackButton";
import { ColorBox } from "../../Associats/Products/EditProduct/styled";
import { Loader } from "../../../components/Loader";
import PreviewJsonImage from "../../../components/PreviewJsonImage";
import { useTabContext } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";
import CommonCategorySidebar from "../../../components/CommonCategorySidebar";
import { ACCESS_TOKEN } from "../../../utils/constant";
import AuthModal from "../../../components/AuthenticationModal";
import {
  ROUTE_ASSOCIATE_BRAND_STORE,
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP,
  ROUTE_MAIN_SHOP,
} from "../../../routes/routes";
import { Helmet } from "react-helmet";
import { FacebookShareButton, InstapaperShareButton } from "react-share";

const validation = Yup.object().shape({
  // product_variant_id: Yup.string().required("Color is required!"),
  // product_sub_variant_id: Yup.string().required("Size is required!"),
  quantity: Yup.string().required("Quantity is required!"),
});

const SingleProduct = (props) => {
  const { isAssociateProduct } = props;
  const params = useParams();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [productData, setProductData] = useState([]);
  const [prieviewProduct, setPrieviewProduct] = useState({});
  const [aboutProductsData, setAboutProductsData] = useState();
  const [authenticationModal, setAuthenticationModal] = useState(false);
  const [associateProductColors, setAssociateProductColors] = useState([]);
  const [wishListData, setWishListData] = useState([]);

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
  const getAboutProductsData = async (sub_categoryId) => {
    let url = "about-product-data";

    if (sub_categoryId && sub_categoryId != 0) {
      url = `${url}?subcategory_id=${sub_categoryId}`;
    }

    const response = await commonGetQuery(url);
    if (response) {
      const { data } = response.data;
      setAboutProductsData(data);
    }
  };
  const formik = useFormik({
    initialValues: {
      product_variant_id: "",
      product_sub_variant_id: "",
      quantity: 1,
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const reqBody = {
        associate_product_id: get(params, "id")?.split("-")?.[1],
        product_variant_id: values.product_variant_id,
        product_sub_variant_id: values.product_sub_variant_id,
        quantity: values.quantity,
        action_type: "add_to_cart",
      };
      const URL = "/cart_products/add-to-cart";
      setLoading(true);
      const response = await commonAddUpdateQuery(URL, reqBody, "POST");
      SuccessTaster("Added to cart sucessfully");
      setLoading(false);
      // if (generatedImageRef.current) {
      //   generatedImageRef.current.click();
      // }
    },
  });

  const getAssociateProduct = async () => {
    setLoading(true);
    let id = get(params, "id")?.split("-")?.[1];
    const response = await commonGetQuery(`/associate_products/${id}`);
    if (response) {
      const { data } = response.data;
      setProductData(data);
      if (size(get(data, "product.product_variants")) > 0) {
        const findCoverImage = [
          ...get(data, "product.product_variants"),
        ].filter((item) => item.color_id === get(data, "cover_image_color_id"));
        setPrieviewProduct(findCoverImage[0]);
        formik.setFieldValue(
          "product_variant_id",
          get(data, "product.product_variants.0.id", "")
        );

        let associatePData = [...data?.associate_product_colors].map(
          (item) => item?.color_id
        );
        const filteredData = get(data, "product.product_variants").filter(
          (item) => associatePData.includes(item.color_id)
        );
        setAssociateProductColors(filteredData);
        getAboutProductsData(get(data, "product.sub_category.id"));
      }
      setLoading(false);
    }
    setLoading(false);
  };

  const handelChangeViewProduct = (id) => {
    formik.setFieldValue("product_variant_id", id);
    formik.setFieldValue("product_sub_variant_id", "");
    let currentProduct = get(productData, "product.product_variants").find(
      (item) => item.id === id
    );
    setPrieviewProduct(currentProduct);
  };

  const addRemoveWishList = async (id) => {
    if (!ACCESS_TOKEN) {
      ErrorTaster("Please login first");
      return;
    }
    setLoading(true);
    const response = await commonAddUpdateQuery(
      `/wishlist`,
      { associate_product_id: id },
      "POST"
    );
    if (response) {
      if (ACCESS_TOKEN) {
        getWishListData();
      }
      SuccessTaster("Product added to WishList Sucessfully");
    }
    setLoading(false);
  };

  const checkIsInWishList = (id) => {
    if (wishListData.length > 0) {
      return wishListData.find((item) => item.associate_product_id == id);
    }
  };

  useEffect(() => {
    getAssociateProduct();
    if (ACCESS_TOKEN) {
      getWishListData();
    }
  }, []);

  let ShopUrl = !isAssociateProduct
    ? ROUTE_MAIN_SHOP
    : ROUTE_ASSOCIATE_BRAND_STORE_SHOP.replace(":sId", get(params, "id", null));

  let CetegoryUrl = `${ShopUrl}?categoryId=${get(
    productData,
    "product.category_id",
    0
  )}`;
  let SubCetegoryUrl = `${ShopUrl}?categoryId=${get(
    productData,
    "product.category_id",
    0
  )}&sub_categoryId=${get(productData, "product.subcategory_id", 0)}`;

  return loading ? (
    <div className="p-5">
      <Loader></Loader>
    </div>
  ) : (
    <div className="page-wrapper single-product-page">
      <Helmet>
        <title>
          {get(productData, "name")
            ? `${get(productData, "name")}`
            : t("Product Details - Hulahop")}
        </title>
      </Helmet>
      <div className="product-hero-section">
        <div className="container single-product-container">
          <GobackButton />
          <div className="row">
            <div className="col-lg-5">
              <div className="product-img-section">
                <div className="product-img-box">
                  <div className="image-box-wrapper">
                    <PreviewJsonImage
                      previewImageUrl={getImageUrlById(
                        get(prieviewProduct, "image_id")
                      )}
                      json={
                        get(productData, "image_json.imageObj", "")
                          ? JSON.parse(
                              get(productData, "image_json.imageObj", "")
                            )
                          : null
                      }
                      autoHeight
                      productData={productData}
                    />
                  </div>
                </div>
                <div className="product-img-silder-box">
                  <div className="product-img-silder">
                    <SliderComponent
                      dots={false}
                      slidesToShow={
                        size(associateProductColors) > 4
                          ? 4
                          : size(associateProductColors)
                      }
                      arrows={true}
                    >
                      {size(associateProductColors) > 0 &&
                        map(associateProductColors, (item, key) => {
                          return (
                            <div className="product-img-silde" key={key}>
                              <div
                                className="silde-img-box"
                                onClick={() => handelChangeViewProduct(item.id)}
                              >
                                <img
                                  src={getImageUrlById(
                                    get(item, "image_id", "")
                                  )}
                                  alt=""
                                />
                              </div>
                            </div>
                          );
                        })}
                    </SliderComponent>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="product-description-section">
                <div className="product-detail-box">
                  <div className="product-detail-wrapper">
                    <div className="product-basic">
                      <h3 className="product-name">
                        {get(productData, "name", "")}
                      </h3>
                      <h5 className="product-price">
                        {get(productData, "price", "")} DIN
                      </h5>
                      <p className="about-product">
                        {get(productData, "description", "")}
                      </p>
                    </div>
                    <div className="product-hr-line"></div>
                    <div className="product-vendor-data">
                      {!isAssociateProduct && (
                        <div className="vendor-name">
                          <p>
                            {" "}
                            <b>{t("Vendor")}:</b>
                          </p>
                          <>
                            {size(
                              get(productData, "user.store_layout_details")
                            ) > 0 && (
                              <div
                                onClick={() => {
                                  window.location =
                                    ROUTE_ASSOCIATE_BRAND_STORE.replace(
                                      ":id",
                                      productData?.user_id
                                    );
                                }}
                                className="associate-store"
                              >
                                <div className="logo">
                                  <img
                                    src={getImageUrlById(
                                      get(
                                        productData,
                                        "user.store_layout_details[0].logo_image"
                                      )
                                    )}
                                    alt=""
                                  />
                                </div>
                                <div className="name">
                                  {get(
                                    productData,
                                    "user.store_layout_details[0].name"
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        </div>
                      )}
                      <div className="category-name">
                        <p>
                          <b>{t("Category")}:</b>
                        </p>
                        <p className="product-category  ">
                          <span
                            onClick={() => window.location.replace(CetegoryUrl)}
                          >
                            {t(get(productData, "product.category.name", ""))}
                          </span>
                          ,{" "}
                          <span
                            onClick={() =>
                              window.location.replace(SubCetegoryUrl)
                            }
                          >
                            {t(
                              get(productData, "product.sub_category.name", "")
                            )}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="product-hr-line"></div>
                    <div className="color-detail-data">
                      <div className="color-detail-flexbox">
                        <p className="color-text">{t("Color")}:</p>
                        <Row className="color-row">
                          {get(productData, "product") &&
                            associateProductColors &&
                            associateProductColors.map((item, i) => (
                              <Col
                                md={2}
                                lg={2}
                                sm={4}
                                key={`color-${i}`}
                                className="color-col"
                              >
                                <ColorBox
                                  onClick={() =>
                                    handelChangeViewProduct(item.id)
                                  }
                                  color={item.color?.code}
                                  className={
                                    item.id === get(prieviewProduct, "id") &&
                                    "active"
                                  }
                                >
                                  <div className="dot"></div>
                                </ColorBox>
                              </Col>
                            ))}
                        </Row>
                      </div>
                      {formik.errors.product_variant_id && (
                        <p>{formik.errors.product_variant_id}</p>
                      )}
                    </div>
                    {/* <div className="product-hr-line"></div> */}
                    {get(prieviewProduct, "sub_variants") &&
                      size(get(prieviewProduct, "sub_variants")) > 0 && (
                        <>
                          {size(get(prieviewProduct, "sub_variants")) === 1 &&
                          !get(
                            prieviewProduct,
                            "sub_variants[0].value"
                          ) ? null : (
                            <div className="size-detail-box">
                              <div className="size-detail-flexbox">
                                <p className="size-text">{t("Size")}:</p>
                                <div className="size-flexbox">
                                  {get(prieviewProduct, "sub_variants").map(
                                    (item, index) => (
                                      <p
                                        key={index}
                                        className={cx(
                                          "size-box",
                                          formik &&
                                            formik.values
                                              .product_sub_variant_id &&
                                            formik.values
                                              .product_sub_variant_id ===
                                              item.id &&
                                            "selected"
                                        )}
                                        onClick={() =>
                                          formik.setFieldValue(
                                            "product_sub_variant_id",
                                            item.id
                                          )
                                        }
                                      >
                                        {get(item, "value")}
                                      </p>
                                    )
                                  )}
                                </div>
                              </div>
                              {formik.errors.product_sub_variant_id && (
                                <p className="input-error">
                                  {formik.errors.product_sub_variant_id}
                                </p>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    <div className="product-hr-line"></div>
                    <div className="add-cart-section">
                      <div className="add-cart-flexbox">
                        <div className="quantity-box">
                          <div
                            className="cart-plus-minus cart-minus"
                            onClick={() => {
                              formik.setFieldValue(
                                "quantity",
                                formik.values.quantity
                                  ? formik.values.quantity + 1
                                  : 1
                              );
                            }}
                          >
                            <AddIcon />
                          </div>
                          <div className="cart-plus-minus  quantity">
                            {formik && formik.values.quantity}
                          </div>
                          <div
                            className="cart-plus-minus cart-plus"
                            onClick={() => {
                              formik.setFieldValue(
                                "quantity",
                                formik.values.quantity > 1
                                  ? formik.values.quantity - 1
                                  : 1
                              );
                            }}
                          >
                            <RemoveIcon />
                          </div>
                          {formik.errors.quantity && (
                            <p className="input-error">
                              {formik.errors.quantity}
                            </p>
                          )}
                        </div>
                        <div className="add-cart-btn">
                          <ButtonComponent
                            text={t("ADD TO CART")}
                            startIcon={<ShoppingCartIcon />}
                            variant="contained"
                            className="add-btn"
                            onClick={() =>
                              ACCESS_TOKEN
                                ? formik.submitForm()
                                : setAuthenticationModal(!authenticationModal)
                            }
                          />
                        </div>
                        {/* <div className="buy-now-btn">
                          <ButtonComponent
                            text="Buy it now"
                            variant="outlined"
                            className="buy-btn"
                          />
                        </div> */}
                      </div>
                    </div>
                    <div className="wishlist-box">
                      <p
                        role="button"
                        onClick={() => {
                          loading ||
                          checkIsInWishList(get(productData, "id", ""))
                            ? {}
                            : addRemoveWishList(get(productData, "id", ""));
                        }}
                      >
                        <span className="wishlist-icon">
                          {loading ? (
                            <div className="loader">
                              <Loader />
                            </div>
                          ) : checkIsInWishList(get(productData, "id", "")) ? (
                            <FavoriteIcon style={{ color: "red" }} />
                          ) : (
                            <FavoriteBorderIcon />
                          )}{" "}
                        </span>
                        <span className="wishlist-text">
                          {t("Add to wishlist")}
                        </span>
                      </p>
                    </div>
                    <div className="product-hr-line"></div>
                    <div className="share-product-section">
                      <div className="share-product-flexbox">
                        <p className="share-text">{t("Share")}:</p>
                        <div className="social-flexbox">
                          <div className="social-box">
                            <p className="social-icon">
                              <FacebookShareButton url={window.location.href}>
                                <BiLogoFacebook />
                              </FacebookShareButton>
                            </p>
                            <p>Facebook </p>
                          </div>
                          {/* <div className="social-box">
                            <p className="social-icon">
                              <FaXTwitter />
                            </p>
                            <p>Twitter</p>
                          </div>
                          <div className="social-box">
                            <p className="social-icon">
                              <BiLogoPinterest />
                            </p>
                            <p>Pinterest </p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="after-purchase-section">
        <div className="container">
          {/* <div className="product-description">
            <div className="p-d-title">Product Description</div>
            <div className="content">{get(productData, "description")}</div>
          </div> */}
          {size(aboutProductsData) > 0 && (
            <div className="about-product-section">
              <div className="container">
                <div className="row g-4">
                  <div className="col-12">
                    <div>
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
                      <div className="description-white-box">
                        {get(aboutProductsData, "0.product_description_1") &&
                          parse(
                            get(aboutProductsData, "0.product_description_1")
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="about-product-desciption">
                      <div className="description-white-box white-box">
                        {get(aboutProductsData, "0.product_description_2") &&
                          parse(
                            get(aboutProductsData, "0.product_description_2")
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-12">
              <div className="after-purchase-wrapper">
                <div className="row g-4">
                  <div className="col-lg-4">
                    <div className="after-purchase-box">
                      <div className="after-purchase-flexbox">
                        <div className="icon-box">
                          <LocalShippingIcon />
                        </div>
                        <div className="after-purchase-description">
                          <h4>{t("Free Shipping")}</h4>
                          <p>{t("Free shipping on orders over $99")}.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="after-purchase-box">
                      <div className="after-purchase-flexbox">
                        <div className="icon-box">
                          <GiReceiveMoney />
                        </div>
                        <div className="after-purchase-description">
                          <h4>{t("Money Back")}</h4>
                          <p>{t("15 days money back guarantee.")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="after-purchase-box">
                      <div className="after-purchase-flexbox">
                        <div className="icon-box">
                          <SupportAgentIcon />
                        </div>
                        <div className="after-purchase-description">
                          <h4>{t("Support")}</h4>
                          <p>
                            {t("We strive for great support to please you.")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="related-product-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">Related Products</h3>
              </div>
            </div>
            <div className="col-12">
              <div className="releted-product-listing">
                <SliderComponent dots={false} slidesToShow={5} arrows={true}>
                  {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                    <Product key={i} />
                  ))}
                </SliderComponent>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="releted-category-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("Related Categories")}</h3>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="releted-category-listing categories-slider">
              <SliderComponent dots={false} slidesToShow={4}>
                {categories.map((item, i) => (
                  <Category key={i} name={item.name} image={item.image} />
                ))}
              </SliderComponent>
            </div>
          </div>
        </div>
      </div> */}
      <CommonCategorySidebar
        renderHeader={() => {
          return (
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("Product Categories")}</h3>
              </div>
            </div>
          );
        }}
      />
      {authenticationModal && (
        <AuthModal
          open={authenticationModal}
          handleClose={() => setAuthenticationModal(!authenticationModal)}
        />
      )}
    </div>
  );
};

export default SingleProduct;
