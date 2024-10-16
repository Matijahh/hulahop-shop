import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import * as Yup from "yup";
import * as Action from "../../../Redux/actions";

import Tables from "../../../components/SuperAdmin/Tables";
import ButtonComponent from "../../../components/ButtonComponent";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";

import { ROUTE_ASSOCIATE_BRAND_STORE } from "../../../routes/routes";
import InputComponent from "../../../components/InputComponent";
import BoxFileInput from "../../../components/BoxFileInput";
import { Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { ACCESS_TOKEN, REST_URL_SERVER } from "../../../Utils/constant";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";
import axios from "axios";
import { connect } from "react-redux";
import { decode } from "querystring";
import { tabClasses } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { slugify } from "../../../utils/commonFunctions";

const validation = Yup.object().shape({
  name: Yup.string().required("Store name is required!"),
  logo_image: Yup.string().required("Store logo is required!"),
  description: Yup.string().required("Store description is required!"),
  sliderName: Yup.string().required("Slider name is required!"),
  sliderDesc: Yup.string().required("Slider description is required!"),
  sliderImage: Yup.string().required("Slider image is required!"),
});

const StoreLayout = ({ userData, saveUserData }) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const [fileLoading, setFileLoading] = useState({
    loading: false,
    for: "logo",
  });
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const decoded = jwtDecode(ACCESS_TOKEN);

  const formik = useFormik({
    initialValues: {
      name: "",
      logo_image: "",
      description: "",
      ig_url: "",
      yt_url: "",
      fb_url: "",
      sliderName: "",
      sliderDesc: "",
      sliderImage: "",
      id: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const reqBody = {
        user_id: decoded?.id,
        name: values?.name,
        logo_image: values?.logo_image,
        description: values?.description,
        social_links: {
          ig_url: values?.ig_url,
          yt_url: values?.yt_url,
          fb_url: values?.fb_url,
        },
        slider_name: values?.sliderName,
        slider_description: values?.sliderDesc,
        slider_image: values?.sliderImage,
      };
      setLoading(true);
      const response = await commonAddUpdateQuery(
        values?.id
          ? `/store_layout_details/${values?.id}`
          : "/store_layout_details",
        reqBody,
        values?.id ? "PATCH" : "POST"
      );
      setLoading(false);
      if (response) {
        const { message } = response.data;
        SuccessTaster(message);
      }
    },
  });

  const handleUploadImage = async (file, name) => {
    try {
      let formData = new FormData();
      formData.append("image", file);
      setFileLoading({
        loading: true,
        for: name,
      });
      const response = await axios.post(
        `${REST_URL_SERVER}/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setFileLoading({
        loading: false,
        for: name,
      });
      if (response.status === 200) {
        const { data } = response.data;
        if (name === "sliderImage") {
          formik.setFieldValue("sliderImage", data.id);
        } else {
          formik.setFieldValue("logo_image", data.id);
        }
      }
    } catch (error) {
      setFileLoading({
        loading: false,
        for: name,
      });
      if (error && error.data) {
        const { message } = error.data;
        return ErrorTaster(message);
      }
    }
  };
  const onLogoSelect = (e, name) => {
    const file = e.target && e.target.files[0];
    if (file) {
      handleUploadImage(file, name);
    }
  };

  const handleCancel = (file, name) => {
    if (name === "sliderImage") {
      formik.setFieldValue("sliderImage", null);
    } else {
      formik.setFieldValue("logo_image", null);
    }
  };

  const getStoreData = async () => {
    setLoading(true);
    const response = await commonGetQuery(
      `/store_layout_details/${decoded.id}`
    );
    setLoading(false);
    if (response) {
      const { data } = response.data;

      setStoreName(data?.name ?? "");

      formik.setValues({
        ...formik.values,
        name: data?.name,
        logo_image: data?.logo_image,
        description: data?.description,
        ig_url: data?.social_links && JSON.parse(data.social_links)?.ig_url,
        yt_url: data?.social_links && JSON.parse(data.social_links)?.yt_url,
        fb_url: data?.social_links && JSON.parse(data.social_links)?.fb_url,
        sliderName: data?.store_layout_sliders[0]?.name,
        sliderDesc: data?.store_layout_sliders[0]?.description,
        sliderImage: data?.store_layout_sliders[0]?.image_id,
        id: data?.id,
      });
    }
  };

  useEffect(() => {
    getStoreData();
  }, []);

  return (
    <CommonWhiteBackground>
      <Helmet>
        <title>{t("Store Layout - Associate")}</title>
      </Helmet>
      <FlexBox className="mb-4" isWrap>
        <div className="main-title ">{t("Store Layout")}</div>
        {formik.values.id && (
          <ButtonComponent
            variant="contained"
            text={t("View Your Shop")}
            onClick={() =>
              (window.location.href = ROUTE_ASSOCIATE_BRAND_STORE.replace(
                ":id",
                slugify(storeName, decoded.id)
              ))
            }
          />
        )}
      </FlexBox>
      <form>
        <Row className="gy-2 mb-4">
          <div className="sub-title">{t("1. Basic details")}</div>
          <Col md={2} lg={2} sm={6}>
            <label className="mb-2">{t("Store Logo")}</label>
            <BoxFileInput
              onFileSelect={(e) => onLogoSelect(e, "store_logo")}
              previewURL={
                formik.values.logo_image &&
                `${REST_URL_SERVER}/images/${formik.values.logo_image}`
              }
              onCancel={(e) => handleCancel("store_logo")}
              loading={fileLoading.for === "store_logo" && fileLoading.loading}
            />
            {formik.touched.logo_image && formik.errors.logo_image && (
              <div className="error-msg">{formik.errors.logo_image}</div>
            )}
          </Col>
          <Col md={10} lg={10} sm={6}>
            <InputComponent
              label={t("Store Name")}
              fullWidth
              InnerPlaceholder="Enter store name"
              type="text"
              name="name"
              formik={formik}
            />
          </Col>
          <Col className="col-12">
            <InputComponent
              label={t("About Store")}
              fullWidth
              InnerPlaceholder="Enter about store description"
              type="textarea"
              name="description"
              formik={formik}
            />
          </Col>
          <Col md={12} lg={4} sm={4}>
            <InputComponent
              label={t("Instagram Url")}
              fullWidth
              InnerPlaceholder="Enter instagram url"
              type="text"
              name="ig_url"
              formik={formik}
            />
          </Col>
          <Col md={12} lg={4} sm={4}>
            <InputComponent
              label={t("Youtube Url")}
              fullWidth
              InnerPlaceholder="Enter youtube url"
              type="text"
              name="yt_url"
              formik={formik}
            />
          </Col>
          <Col md={12} lg={4} sm={4}>
            <InputComponent
              label={t("Facebook Url")}
              fullWidth
              InnerPlaceholder="Enter facebook url"
              type="text"
              name="fb_url"
              formik={formik}
            />
          </Col>
          <div className="sub-title mt-3">{t("2. Layout details")}</div>
          <Col md={6} lg={6} sm={6}>
            <InputComponent
              label={t("Slider Name")}
              fullWidth
              InnerPlaceholder="Enter slider name"
              type="text"
              name="sliderName"
              formik={formik}
            />
          </Col>
          <Col md={6} lg={6} sm={6}>
            <InputComponent
              label={t("Slider description")}
              fullWidth
              InnerPlaceholder="Enter slider description"
              type="text"
              name="sliderDesc"
              formik={formik}
            />
          </Col>
          <Col md={2} lg={2} sm={6}>
            <label className="mb-2">{t("Slider Images")}</label>
            <BoxFileInput
              onFileSelect={(data) => onLogoSelect(data, "sliderImage")}
              previewURL={
                formik.values.sliderImage &&
                `${REST_URL_SERVER}/images/${formik.values.sliderImage}`
              }
              onCancel={(image) => handleCancel(image, "sliderImage")}
              loading={fileLoading.for === "sliderImage" && fileLoading.loading}
            />
            {formik.touched.sliderImage && formik.errors.sliderImage && (
              <div className="error-msg">{formik.errors.sliderImage}</div>
            )}
          </Col>
        </Row>
        <FlexBox justifyContent="flex-start justifyContentjustifyContentjustifyContent">
          <ButtonComponent
            onClick={formik.handleSubmit}
            variant="contained"
            text={t("Submit")}
            loading={loading}
          />
        </FlexBox>
      </form>
    </CommonWhiteBackground>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = {
  saveUserData: (data) => Action.saveUserData(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreLayout);
