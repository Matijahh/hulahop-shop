import React, { useState } from "react";
import * as Yup from "yup";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useFormik } from "formik";

import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Radio from "@mui/material/Radio";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { FlexBox } from "../../../components/Sections";
import { SignInContainer } from "./styled";
import { ROUTE_MAIN, ROUTE_SIGN_IN } from "../../../routes/routes";

import logo from "../../../assets/images/logo.png";
import { commonAddUpdateQuery } from "../../../Utils/axiosInstance";
import { SuccessTaster } from "../../../components/Toast";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Please enter a valid password."
    ),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  mobile: Yup.string().required("Mobile number is required"),
  status: Yup.boolean().required("Status is required"),
  type: Yup.string().required("Type is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const SignUp = ({ maxWidth }) => {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      status: true,
      type: "USER",
      password: "",
      confirmPassword: "",
      image_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      setLoading(true);
      const response = await commonAddUpdateQuery("/auth/sign-up", value);
      setLoading(false);
      if (response) {
        const { message } = response.data;
        SuccessTaster(message);
        navigation(ROUTE_SIGN_IN);
        formik.resetForm();
      }
    },
  });

  const handleCheckboxChange = (e) => {
    const value = e.target && e.target.value;
    formik.setFieldValue("type", value);
  };

  return (
    <SignInContainer maxWidth={maxWidth}>
      <Helmet>
        <title>{t("Sign Up - HulaHop")}</title>
      </Helmet>
      <div className="logo-container">
        <div
          className="cover cursor-pointer"
          onClick={() => {
            navigation(ROUTE_MAIN);
          }}
        >
          <img src={logo} />
        </div>
      </div>
      <div className="title-container">
        <div className="title">{t("Sign Up")}</div>
        <div className="description">
          {t("Please create your account to expolre AI image repository.")}
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col className="col-12">
            <Row>
              <Col>
                <InputComponent
                  label={t("First name")}
                  fullWidth
                  name="first_name"
                  formik={formik}
                  disabled={loading}
                  InnerPlaceholder="Enter first name"
                  renderIcon={
                    <>
                      <PersonOutlineOutlinedIcon />
                    </>
                  }
                  hasIcon
                />
              </Col>
              <Col>
                <InputComponent
                  label={t("Last name")}
                  fullWidth
                  name="last_name"
                  disabled={loading}
                  formik={formik}
                  InnerPlaceholder="Enter last name"
                  renderIcon={
                    <>
                      <PersonOutlineOutlinedIcon />
                    </>
                  }
                  hasIcon
                />
              </Col>
            </Row>
          </Col>
          <Col className="col-12">
            <InputComponent
              label={t("Email")}
              fullWidth
              name="email"
              formik={formik}
              disabled={loading}
              InnerPlaceholder="Enter email"
              renderIcon={
                <>
                  <EmailOutlinedIcon />
                </>
              }
              hasIcon
            />
          </Col>
          <Col className="col-12">
            <InputComponent
              label={t("Phone Number")}
              fullWidth
              name="mobile"
              formik={formik}
              disabled={loading}
              InnerPlaceholder="Enter phone no."
              renderIcon={
                <>
                  <PhoneOutlinedIcon />
                </>
              }
              type="text"
              hasIcon
            />
          </Col>

          <Col className="col-12">
            <InputComponent
              label={t("Password")}
              fullWidth
              InnerPlaceholder="Enter password"
              name="password"
              formik={formik}
              disabled={loading}
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
          <Col className="col-12">
            <InputComponent
              label={t("Confirm Password")}
              name="confirmPassword"
              formik={formik}
              disabled={loading}
              fullWidth
              InnerPlaceholder="Enter confirm password"
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
          <Col className="col-12">
            <label>{t("Select Role")}</label>
            <FlexBox justifyContent="flex-start ">
              <FormControlLabel
                value="USER"
                control={<Radio />}
                label={t("User")}
                checked={formik.values.type === "USER"}
                onClick={handleCheckboxChange}
                disabled={loading}
                name="role"
              />
              <FormControlLabel
                value="ASSOCIATE"
                control={<Radio />}
                label={t("Associate")}
                name="role"
                onClick={handleCheckboxChange}
                disabled={loading}
                checked={formik.values.type === "ASSOCIATE"}
              />
            </FlexBox>
          </Col>
          <Col className="col-12 buttons ">
            <ButtonComponent
              variant="contained"
              size="large"
              text={t("Sign Up")}
              width="100%"
              type="submit"
              disabled={loading}
            />
          </Col>
          {!maxWidth && (
            <Col className="col-12">
              <div className="info-text">
                <span>{t("already have an account?")}</span>
                <Link to={ROUTE_SIGN_IN}>{t("Sign In")}</Link>
              </div>
            </Col>
          )}
        </Row>
      </form>
    </SignInContainer>
  );
};

export default SignUp;
