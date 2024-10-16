import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";

import { CommonWhiteBackground } from "../../../components/Sections";
import InputComponent from "../../../components/InputComponent";
import { SettingsContainer } from "./styled";
import ButtonComponent from "../../../components/ButtonComponent";
import { useFormik } from "formik";
import axios from "axios";
import { ACCESS_TOKEN, REST_URL_SERVER } from "../../../utils/constant";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { getUserType } from "../../../utils/commonFunctions";
import { Loader } from "../../../components/Loader";
import { useTranslation } from "react-i18next";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Helmet } from "react-helmet";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
});

const Settings = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleNewPassword, setToggleNewPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      image_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const decoded = jwtDecode(ACCESS_TOKEN);
      setLoading(true);
      const response = await commonAddUpdateQuery(
        `/users/${decoded.id}`,
        {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          mobile: values.phone,
          type: getUserType(),

          image_id: values.image_id,
        },
        "PATCH"
      );
      setLoading(false);
      if (response) {
        const { message } = response.data;
        SuccessTaster(message);
      }
    },
  });

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("image", file);
    try {
      setLoading(true);
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

      if (response.status === 200) {
        const { data } = response.data;
        formik.setFieldValue("image_id", data.id);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error && error.data) {
        const { message } = error.data;
        return ErrorTaster(message);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target && e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const getUserData = async () => {
    const decoded = jwtDecode(ACCESS_TOKEN);
    setLoading(true);
    const response = await commonGetQuery(`/users/${decoded.id}`);
    setLoading(false);
    if (response) {
      const { data } = response.data;
      setUserData(data);
      formik.setValues({
        ...formik.values,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.mobile,
        image_id: data.image_id,
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SettingsContainer>
      <Helmet>
        <title>{t("Settings - Associate")}</title>
      </Helmet>
      <CommonWhiteBackground>
        <div className="main-title mb-4">{t("Settings")}</div>
        <Row>
          <Col md={2} lg={2} sm={2}>
            <label>{t("Profile Picture")}</label>
            {loading ? (
              <Loader />
            ) : (
              <div className="profile-pic-image">
                <img
                  src={`${REST_URL_SERVER}/images/${formik.values.image_id}`}
                />
                <input
                  type="file"
                  className="hidden-input"
                  onChange={handleFileChange}
                />
                <div className="pick-image-icon">
                  <AddAPhotoIcon color="#fff" />
                </div>
              </div>
            )}
          </Col>
          <Col md={10} lg={10} sm={10}>
            <Row className="gy-3">
              <Col md={6} lg={6} sm={12}>
                <InputComponent
                  label={t("First name")}
                  fullWidth
                  InnerPlaceholder="Enter first name"
                  name="firstName"
                  formik={formik}
                />
              </Col>
              <Col md={6} lg={6} sm={12}>
                <InputComponent
                  label={t("Last name")}
                  fullWidth
                  InnerPlaceholder="Enter last name"
                  name="lastName"
                  formik={formik}
                />
              </Col>
              <Col md={6} lg={6} sm={12}>
                <InputComponent
                  label={t("Email")}
                  fullWidth
                  InnerPlaceholder="Enter your email"
                  name="email"
                  formik={formik}
                />
              </Col>
              <Col md={6} lg={6} sm={12}>
                <InputComponent
                  label={t("Phone")}
                  fullWidth
                  InnerPlaceholder="Enter your phone no."
                  name="phone"
                  formik={formik}
                />
              </Col>
              <Col md={6} lg={6} sm={12}>
                <InputComponent
                  label={t("Password")}
                  fullWidth
                  InnerPlaceholder="Enter password"
                  name="password"
                  formik={formik}
                  renderIcon={
                    <div onClick={() => setTogglePassword(!togglePassword)}>
                      {togglePassword ? (
                        <RemoveRedEyeIcon className="cursor-pointer" />
                      ) : (
                        <VisibilityOffIcon className="cursor-pointer" />
                      )}
                    </div>
                  }
                  hasIcon
                  type={togglePassword ? "text" : "password"}
                />
              </Col>
              <Col md={6} lg={6} sm={12}>
                <InputComponent
                  label={t("Confirm Password ")}
                  fullWidth
                  InnerPlaceholder="Enter confirm password"
                  name="confirmPassword"
                  formik={formik}
                  renderIcon={
                    <div
                      onClick={() => setToggleNewPassword(!toggleNewPassword)}
                    >
                      {toggleNewPassword ? (
                        <RemoveRedEyeIcon className="cursor-pointer" />
                      ) : (
                        <VisibilityOffIcon className="cursor-pointer" />
                      )}
                    </div>
                  }
                  hasIcon
                  type={toggleNewPassword ? "text" : "password"}
                />
              </Col>
            </Row>
          </Col>
          <Col md={7} lg={7} sm={7} className="mt-4"></Col>
          <Col md={5} lg={5} sm={5} className="mt-4">
            <Row className="g-3">
              <Col md={6} lg={6} sm={6}>
                {/* <ButtonComponent
                  variant="outlined"
                  size="large"
                  text="BACK"
                  width="100%"
                /> */}
              </Col>
              <Col md={6} lg={6} sm={6}>
                <ButtonComponent
                  variant="contained"
                  width="100%"
                  onClick={formik.handleSubmit}
                  text={t("Save")}
                  loading={loading}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </CommonWhiteBackground>
    </SettingsContainer>
  );
};

export default Settings;
