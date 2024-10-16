import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import _size from "lodash/size";
import _get from "lodash/get";
import _map from "lodash/map";

import ButtonComponent from "../../../components/ButtonComponent";
import { useTranslation } from "react-i18next";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import PreviewJsonImage from "../../../components/PreviewJsonImage";
import { getImageUrlById } from "../../../utils/commonFunctions";
import { Loader } from "../../../components/Loader";
import { ROUTE_MAIN_CHECKOUT, ROUTE_MAIN_SHOP } from "../../../routes/routes";
import { Helmet } from "react-helmet";

const Cart = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(false);

  const getProductSummaryData = async () => {
    setLoading(true);
    const response = await commonGetQuery("/carts/get-cart-summary");
    setLoading(false);
    if (response) {
      const { data } = response.data;
      let cartTotalData = 0;
      let cartProduct = _get(data, "cart_products");
      // Calculate total cart value
      if (_size(cartProduct) > 0) {
        cartProduct.forEach((product) => {
          const price = parseFloat(product.associate_product.price);
          const quantity = Number(product.quantity);
          cartTotalData += price * quantity;
        });
      }
      setCartTotal(cartTotalData);
      setCartProducts(data);
    }
  };

  const updateCart = async (item, type, quantity) => {
    setUpdateLoading(true);
    const response = await commonAddUpdateQuery("/cart_products/add-to-cart", {
      associate_product_id: parseFloat(_get(item, "associate_product_id")),
      product_variant_id: parseFloat(_get(item, "product_variant_id")),
      product_sub_variant_id: parseFloat(_get(item, "product_sub_variant_id")),
      action_type: type === "increment" ? "add_qty" : "remove_qty",
      quantity: parseFloat(quantity),
    });
    setUpdateLoading(false);
    if (response) {
      getProductSummaryData();
    }
  };

  const removeProduct = async (item) => {
    setUpdateLoading(true);
    const response = await commonAddUpdateQuery("/cart_products/add-to-cart", {
      associate_product_id: parseFloat(_get(item, "associate_product_id")),
      product_variant_id: parseFloat(_get(item, "product_variant_id")),
      product_sub_variant_id: parseFloat(_get(item, "product_sub_variant_id")),
      action_type: "remove_product",
      quantity: parseFloat(_get(item, "quantity")),
    });
    setUpdateLoading(false);
    if (response) {
      getProductSummaryData();
    }
  };

  useEffect(() => {
    getProductSummaryData();
  }, []);

  return (
    <div className="page-wrapper cart-page">
      <Helmet>
        <title>{t("Shopping Cart - HulaHop")}</title>
      </Helmet>
      <div className="cart-listing-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {updateLoading && (
                <div className="overflow-loader">
                  <Loader />
                </div>
              )}
              <div className="hero-section m-0">
                <h3 className="banner-head">{t("Your Shopping Cart")}</h3>
              </div>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center aline-items-center">
                <Loader />
              </div>
            ) : (
              <>
                {_size(_get(cartProducts, "cart_products")) > 0 ? (
                  _map(_get(cartProducts, "cart_products"), (item, key) => (
                    <div className="col-12" key={key}>
                      <div className="cart-listing-box">
                        <div className="cart-listing-box-wrapper">
                          <div className="cart-listing-flexbox">
                            <div className="product-image-box">
                              <PreviewJsonImage
                                previewImageUrl={getImageUrlById(
                                  _get(item, "product_variant.image_id", "-")
                                )}
                                json={
                                  _get(
                                    item,
                                    "associate_product.image_json.imageObj",
                                    null
                                  )
                                    ? JSON.parse(
                                        _get(
                                          item,
                                          "associate_product.image_json.imageObj",
                                          null
                                        )
                                      )
                                    : null
                                }
                                maxHeight={"130px"}
                                productData={_get(
                                  item,
                                  "associate_product",
                                  null
                                )}
                              />
                            </div>
                            <div className="product-desc-box">
                              <h4 className="product-name">
                                {_get(item, "associate_product.name", "-")}
                              </h4>
                            </div>
                            <div className="product-price-box">
                              <p className="product-price">
                                {_get(item, "associate_product.price", "-")} DIN
                              </p>
                            </div>
                            <div className="product-quantity-box">
                              <div className="quantity-box">
                                <div
                                  className="cart-plus-minus cart-plus"
                                  onClick={() =>
                                    parseFloat(_get(item, "quantity", null)) > 1
                                      ? updateCart(
                                          item,
                                          "decrement",
                                          parseFloat(
                                            _get(item, "quantity", null)
                                          ) - 1
                                        )
                                      : removeProduct(item)
                                  }
                                >
                                  <RemoveIcon />
                                </div>
                                <div className="cart-plus-minus  quantity">
                                  {_get(item, "quantity", null)}
                                </div>
                                <div
                                  className="cart-plus-minus cart-minus"
                                  onClick={() =>
                                    updateCart(
                                      item,
                                      "increment",
                                      parseFloat(_get(item, "quantity", null)) +
                                        1
                                    )
                                  }
                                >
                                  <AddIcon />
                                </div>
                              </div>
                            </div>
                            <div className="product-intotal-box">
                              <p className="product-intotal">
                                {parseFloat(
                                  _get(item, "associate_product.price", 0) *
                                    _get(item, "quantity", null) || 1
                                ).toFixed(2)}{" "}
                                DIN
                              </p>
                            </div>
                            <div className="product-remove-box">
                              <div
                                className="remove-icon"
                                onClick={() => removeProduct(item)}
                              >
                                <CloseIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <center>
                    <b>No Product Fond!</b>
                  </center>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="shoping-btn-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="shoping-btns">
                <div className="shoping-btns-flexbox">
                  <ButtonComponent
                    text={t("CONTINUE SHOPING")}
                    variant="contained"
                    className="continue-btn"
                    maxHeight="50px"
                    onClick={() => navigator(ROUTE_MAIN_SHOP)}
                  />
                  {_size(_get(cartProducts, "cart_products")) > 0 && (
                    <ButtonComponent
                      text={t("CLEAR CART")}
                      variant="contained"
                      className="clear-btn"
                      maxHeight="50px"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {_size(_get(cartProducts, "cart_products")) > 0 && (
        <div className="cart-footer-section">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-6"></div>
              <div className="col-lg-6">
                <div className="total-section">
                  <div className="total-heading">
                    <h4>{t("Cart Totals")}</h4>
                  </div>
                  <div className="cart-toal-table">
                    <table className="table table-responsive table-bordered ">
                      <tbody>
                        <tr>
                          <th>{t("Subtotal")}</th>
                          <td>{cartTotal} DIN</td>
                        </tr>
                        <tr>
                          <th>{t("Total")}</th>
                          <td>{cartTotal} DIN</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="checkout-btn-box">
                    <ButtonComponent
                      text={t("PROCEED TO CHECKOUT")}
                      variant="contained"
                      className="checkout-btn"
                      maxHeight="50px"
                      onClick={() => navigator(ROUTE_MAIN_CHECKOUT)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
