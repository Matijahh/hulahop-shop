import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { get, isEmpty, map, size } from "lodash";
import { renderHeader } from "./mock";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import {
  getImageUrlById,
  getSelectobjectValue,
} from "../../../utils/commonFunctions";
import moment from "moment/moment";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";

import Tables from "../../../components/SuperAdmin/Tables";
import ModalComponent from "../../../components/ModalComponent";
import PreviewJsonImage from "../../../components/PreviewJsonImage";
import DownloadIcon from "@mui/icons-material/Download";
import DownloadFile from "../../../utils/FileDownload";
import ButtonComponent from "../../../components/ButtonComponent";
import SelectComponent from "../../../components/SelectComponent";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [ordersProductsList, setOrdersProductsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState("");

  const { t } = useTranslation();

  const getOrdersProducts = async () => {
    setLoading(true);

    const response = await commonGetQuery("/orders");

    if (response) {
      const { data } = response.data;
      setOrdersProductsList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const StatusList = [
    {
      id: "Pending",
      title: t("Pending"),
    },
    {
      id: "Dispatched",
      title: t("Dispatched"),
    },
    {
      id: "Delivered",
      title: t("Delivered"),
    },
    {
      id: "Cancelled",
      title: t("Cancelled"),
    },
  ];

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      id: get(item, "id", ""),
      price: get(item, "total_amount", ""),
      date: moment(Number(get(item, "created_at", ""))).format("DD/MM/YYYY"),
      sku: get(item, "sku", ""),
      status: get(item, "status", ""),
      image: get(item, "order_products.0.product_variant.image_id", ""),
      orderDetail: item,
      openModel,
    }));

    return renderData;
  };

  const openModel = (item) => {
    setIsOpen(true);

    let finalStatus = get(item, "status")
      ? `${get(item, "status")},${get(item, "status")}`
      : "PENDING,PENDING";

    setOrderStatus(finalStatus);
    setSelectedOrder(item);
  };

  const closeModel = () => {
    setIsOpen(false);
    setSelectedOrder({});
    setOrderStatus("");
  };

  const handleUpdateOrderStatus = async (id) => {
    setLoading(true);

    const URL = id ? `/orders/${id}/status` : "";
    let finalStatus = orderStatus && getSelectobjectValue(orderStatus);

    if (URL) {
      const reqBody = {
        status: finalStatus ? finalStatus.id : "Pending",
      };

      try {
        const response = await commonAddUpdateQuery(URL, reqBody, "PATCH");

        if (response) {
          SuccessTaster("Order status updated sucessfully");
          closeModel();
          getOrdersProducts();
        }

        setLoading(false);
      } catch (error) {
        ErrorTaster(error.response.message);
      }
    }
  };

  useEffect(() => {
    getOrdersProducts();
  }, []);

  return (
    <>
      <CommonWhiteBackground>
        <FlexBox className="mb-4">
          <div className="main-title ">{t("Orders")}</div>
        </FlexBox>
        <Tables
          body={
            size(ordersProductsList) > 0
              ? setTableRenderData(ordersProductsList)
              : []
          }
          header={renderHeader.map((item) => ({
            ...item,
            headerName: t(item.headerName),
          }))}
        />
      </CommonWhiteBackground>

      <ModalComponent open={isOpen} title={t("Order")} handleClose={closeModel}>
        <div className="order-detail-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="order-status-box">
                  <div className="d-flex gap-3 align-items-end justify-content-end">
                    <div>
                      <SelectComponent
                        fullWidth
                        name="status"
                        optionList={StatusList}
                        onChange={({ target }) => {
                          setOrderStatus(target.value);
                        }}
                        isShowValue
                        value={orderStatus}
                        title={t("Select Status")}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <ButtonComponent
                        text={t("Update")}
                        variant="contained"
                        className="mb-2"
                        onClick={() => {
                          handleUpdateOrderStatus(selectedOrder.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <h5>{t("User Detail")}</h5>
              </div>
              <div className="col-12">
                <div className="user-detail-box">
                  <div className="row g-3">
                    <div className="col-4">
                      <p>{t("Name")}</p>
                      <p>
                        {get(selectedOrder, "order_addresses.0.first_name")}{" "}
                        {get(selectedOrder, "order_addresses.0.last_name")}
                      </p>
                    </div>
                    <div className="col-4">
                      <p>{t("Mobile")}</p>
                      <p>{get(selectedOrder, "order_addresses.0.mobile")}</p>
                    </div>
                    <div className="col-4">
                      <p>{t("Email")}</p>
                      <p>{get(selectedOrder, "order_addresses.0.email")}</p>
                    </div>
                    <div className="col-4">
                      <p>{t("House/Flat no")}</p>
                      <p>
                        {get(selectedOrder, "order_addresses.0.house_flat_no")}
                      </p>
                    </div>
                    <div className="col-4">
                      <p>{t("City")}</p>
                      <p>{get(selectedOrder, "order_addresses.0.city")}</p>
                    </div>
                    <div className="col-4">
                      <p>{t("State")}</p>
                      <p>{get(selectedOrder, "order_addresses.0.state")}</p>
                    </div>
                    <div className="col-4">
                      <p>{t("Pincode")}</p>
                      <p>{get(selectedOrder, "order_addresses.0.pincode")}</p>
                    </div>
                    <div className="col-12">
                      <p>{t("Special Instruction By User")}</p>
                      <p>{get(selectedOrder, "instructions", "-") || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <h5>{t("Product List")}</h5>
              </div>
              <div className="col-12">
                {!isEmpty(selectedOrder) &&
                  size(get(selectedOrder, "order_products", [])) > 0 &&
                  get(selectedOrder, "order_products", []).map(
                    (item, index) => {
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
                        <div className="order-detail-box" key={index}>
                          <div className="row g-3">
                            <div className="col-12">
                              <h6>
                                {t("Product")} {index + 1}
                              </h6>
                            </div>
                            <div className="col-lg-3">
                              <div className="product-img-box">
                                <h6>{t("Product Image")}</h6>
                                <PreviewJsonImage
                                  previewImageUrl={getImageUrlById(
                                    get(item, "product_variant.image_id")
                                  )}
                                  json={jsonData}
                                  maxHeight="200px"
                                  productData={get(item, "associate_product")}
                                />
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div className="mock-up-img-box">
                                <h6>{t("Product Mockup Image")}</h6>
                                <div className="mock-up-img">
                                  <img src={get(jsonData, "0.image")} alt="" />
                                  <div
                                    className="download-icon"
                                    onClick={() => {
                                      DownloadFile(
                                        get(jsonData, "0.image"),
                                        `${selectedOrder.sku}-product-${item.id}`
                                      );
                                    }}
                                  >
                                    <DownloadIcon />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="product-info-box">
                                <div className="row g-3">
                                  <div className="col-4">
                                    <p className="product-cmn-data">
                                      {t("Base Price")} :
                                    </p>
                                    <p>
                                      {get(
                                        item,
                                        "associate_product.product.price",
                                        ""
                                      )}
                                    </p>
                                  </div>
                                  <div className="col-4">
                                    <p className="product-cmn-data">
                                      {t("Assosiate Price")} :
                                    </p>
                                    <p>
                                      {get(item, "associate_product.price", "")}
                                    </p>
                                  </div>
                                  <div className="col-4">
                                    <p className="product-cmn-data">
                                      {t("Margine")} :
                                    </p>
                                    <p>
                                      {parseFloat(
                                        get(item, "associate_product.price", "")
                                      ) -
                                        parseFloat(
                                          get(
                                            item,
                                            "associate_product.product.price",
                                            ""
                                          )
                                        )}
                                    </p>
                                  </div>
                                  <div className="col-4">
                                    <p>{t("Quantity")} :</p>
                                    <p>{get(item, "quantity")}</p>
                                  </div>
                                  <div className="col-4">
                                    <p>{t("Selected Color")} :</p>
                                    <p className="color-data">
                                      <span>
                                        {`${get(
                                          item,
                                          "product_variant.color.name"
                                        )} (${get(
                                          item,
                                          "product_variant.color?.code"
                                        )})`}
                                      </span>

                                      <span
                                        className="color-circle"
                                        style={{
                                          background: `${get(
                                            item,
                                            "product_variant.color?.code"
                                          )}`,
                                        }}
                                      ></span>
                                    </p>
                                  </div>
                                  <div className="col-4">
                                    <p>{t("Varriant Value")}</p>
                                    <p>
                                      {get(item, "product_sub_variant.value")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        </div>
      </ModalComponent>
    </>
  );
};

export default Orders;
