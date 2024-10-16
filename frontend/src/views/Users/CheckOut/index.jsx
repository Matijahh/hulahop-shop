import React, { useEffect, useState } from "react";
import InputComponent from "../../../components/InputComponent";
import * as Yup from "yup";
import ButtonComponent from "../../../components/ButtonComponent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { get, size } from "lodash";
import PreviewJsonImage from "../../../components/PreviewJsonImage";
import { getImageUrlById } from "../../../utils/commonFunctions";
import { useFormik } from "formik";
import { SuccessTaster } from "../../../components/Toast";
import { ROUTE_MAIN_ORDERS } from "../../../routes/routes";
import { Helmet } from "react-helmet";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    // .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
  house_flat_no: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  //state: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
});

const CheckOut = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      house_flat_no: "",
      street_locality: "",
      city: "",
      //state: null,
      country: "",
      pincode: "",
      instructions: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const order_addresses = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        mobile: values.mobile,
        house_flat_no: values.house_flat_no,
        street_locality: "",
        city: values.city,
        //state: null,
        country: values.country,
        pincode: values.pincode,
      };
      const response = await commonAddUpdateQuery(
        "/orders/order-place",
        {
          instructions: values.instructions,
          order_addresses,
          status: "PENDING",
        },
        "POST"
      );
      setLoading(false);
      if (response) {
        const { message } = response.data;
        SuccessTaster(message);
        navigate(ROUTE_MAIN_ORDERS);
      }
    },
  });

  const getCartList = async () => {
    setLoading(true);
    const response = await commonGetQuery("/carts/get-cart-summary");
    if (response) {
      const { data } = response.data;
      setCartList(data);
      let cartTotalData = 0;
      let cartProducts = get(data, "cart_products");
      // Calculate total cart value
      if (size(cartProducts) > 0) {
        cartProducts.forEach((product) => {
          const price = parseFloat(product.associate_product.price);
          const quantity = Number(product.quantity);
          cartTotalData += price * quantity;
        });
      }
      setCartTotal(cartTotalData);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCartList();
  }, []);

  return (
    <div className="page-wrapper checkout-page">
      <Helmet>
        <title>{t("CheckOut - HulaHop")}</title>
      </Helmet>
      <div className="checkout-banner-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("CHECKOUT")}</h3>
                <p className="banner-pera">
                  {t(
                    "Complete your purchase and get your order on its way. We're committed to your security and satisfaction. The latest security technology protects your personal information, and we offer a hassle-free return policy."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blling-order-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="billing-section">
                <div className="hero-section">
                  <h3 className="banner-head">{t("BILLING DETAILS")}</h3>
                </div>
                <div className="billing-form-box">
                  <form className="billing-form">
                    <div className="container-fluid">
                      <div className="row g-3">
                        <div className="col-lg-6">
                          <InputComponent
                            InnerPlaceholder="First Name"
                            fullWidth
                            label="First Name *"
                            name="first_name"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-6">
                          <InputComponent
                            InnerPlaceholder="Last Name"
                            fullWidth
                            label="Last Name *"
                            name="last_name"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-12">
                          <InputComponent
                            InnerPlaceholder="Email"
                            fullWidth
                            label="Email *"
                            name="email"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-12">
                          <InputComponent
                            InnerPlaceholder="Contact No"
                            fullWidth
                            label="Contact No *"
                            name="mobile"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-12">
                          <InputComponent
                            InnerPlaceholder="Street and house number"
                            fullWidth
                            label="Street and house number *"
                            name="house_flat_no"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-6">
                          <InputComponent
                            InnerPlaceholder="City *"
                            fullWidth
                            label="City *"
                            name="city"
                            formik={formik}
                          />
                        </div>
                        {/* <div className="col-lg-6">
                          <InputComponent
                            InnerPlaceholder="State *"
                            fullWidth
                            label="State *"
                            name="state"
                            formik={formik}
                          />
                        </div> */}
                        <div className="col-lg-12">
                          <InputComponent
                            InnerPlaceholder="Country / Region "
                            fullWidth
                            label="Country / Region  *"
                            name="country"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-12">
                          <InputComponent
                            InnerPlaceholder="Postal code"
                            fullWidth
                            label="Postal code *"
                            name="pincode"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-12">
                          <InputComponent
                            InnerPlaceholder="Write instructions"
                            fullWidth
                            label="Special instructions for seller"
                            type="textarea"
                            height="100px"
                            className="summary-input"
                            name="instructions"
                            formik={formik}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="order-section">
                <div className="hero-section">
                  <h3 className="banner-head">{t("YOUR ORDER")}</h3>
                </div>
                <div className="order-detail-box">
                  {cartList &&
                    size(get(cartList, "cart_products")) > 0 &&
                    get(cartList, "cart_products").map((item, index) => {
                      let jsonData = get(
                        item,
                        "associate_product.image_json.imageObj",
                        ""
                      )
                        ? JSON.parse(
                            get(
                              item,
                              "associate_product.image_json.imageObj",
                              ""
                            )
                          )
                        : null;
                      return (
                        <div className="product-item-box" key={index}>
                          <div className="product-item-flexbox">
                            <div className="product-info-flexbox">
                              <div className="product-img-box">
                                {/* <img src={muska1} alt="" /> */}
                                <PreviewJsonImage
                                  previewImageUrl={getImageUrlById(
                                    get(item, "product_variant.image_id")
                                  )}
                                  json={jsonData}
                                  maxHeight="80px"
                                  productData={get(
                                    item,
                                    "associate_product",
                                    null
                                  )}
                                />
                                <p className="product-quantity">
                                  {get(item, "quantity")}
                                </p>
                              </div>
                              <div className="product-description">
                                <h6 className="product-name">
                                  {get(item, "associate_product.name")}
                                </h6>
                                <p>
                                  <b>Prize:</b>{" "}
                                  {get(item, "associate_product.price")} DIN
                                </p>
                                <p>
                                  <b>Size:</b>{" "}
                                  {get(item, "product_sub_variant.value")}
                                </p>
                                {/* <p>
                                  <b>Vendor:</b> Popcorn
                                </p> */}
                              </div>
                            </div>
                            <div className="item-total-box">
                              <h5 className="item-total">
                                {Number(
                                  get(item, "quantity") *
                                    Number(get(item, "associate_product.price"))
                                )}{" "}
                                DIN
                              </h5>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="order-total-box">
                  <div className="checkout-total-table">
                    <table className="table table-responsive  ">
                      <tbody>
                        <tr>
                          <th>Subtotal</th>
                          <td>{cartTotal} DIN</td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td>{cartTotal} DIN</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="checkout-btn-box">
                    <ButtonComponent
                      text={t("PLACE-ORDER")}
                      variant="contained"
                      className="checkout-btn"
                      maxHeight="50px"
                      onClick={() => {
                        formik.handleSubmit();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
