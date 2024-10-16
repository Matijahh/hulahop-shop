import React, { useState } from "react";
import { useFormik } from "formik";
import { Col, Row } from "react-bootstrap";
import { Checkbox, FormControlLabel, Radio } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import * as Yup from "yup";

import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { SignInContainer } from "./styled";
import { FlexBox } from "../../../components/Sections";
import { ROUTE_MAIN, ROUTE_SIGN_UP } from "../../../routes/routes";
import { commonAddUpdateQuery } from "../../../utils/axiosInstance";
import { SuccessTaster } from "../../../components/Toast";
import {
  handleRedirection,
  setTokenAfterLogin,
} from "../../../utils/commonFunctions";

import logo from "../../../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const validation = Yup.object().shape({
  id: Yup.string().required("This filed is required!"),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Please enter a valid password."
    ),
});

const SignIn = ({ maxWidth, RedirectUrl }) => {
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("ASSOCIATE");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      id: "",
      password: "",
      isCheckedRememberMe: false,
      type: "USER",
    },
    validationSchema: validation,
    onSubmit: async (value) => {
      setLoading(true);
      let reqBody;
      if (value.type === "USER") {
        reqBody = {
          email: value.id,
          password: value.password,
        };
      } else {
        if (value.id.includes("@")) {
          reqBody = {
            email: value.id.toString(),
            password: value.password,
          };
        } else {
          reqBody = {
            mobile: value.id.toString(),
            password: value.password,
          };
        }
      }
      const response = await commonAddUpdateQuery("/auth/login", {
        ...reqBody,
      });
      if (response) {
        const { message, data } = response.data;
        setTokenAfterLogin(response, value.isCheckedRememberMe);
        if (RedirectUrl) {
          window.location.href = RedirectUrl;
        } else {
          handleRedirection(data.type);
        }
        SuccessTaster(message);
      } else {
        setLoading(false);
      }
    },
  });

  const handleCheckRemember = () => {
    formik.setFieldValue(
      "isCheckedRememberMe",
      !formik.values.isCheckedRememberMe
    );
  };

  const handleCheckboxChange = (e) => {
    const value = e.target && e.target.value;
    formik.setFieldValue("type", value);
  };

  return (
    <SignInContainer maxWidth={maxWidth}>
      <Helmet>
        <title>{t("Sign In - HulaHop")}</title>
      </Helmet>
      <div className="logo-container">
        <div
          className="cover cursor-po2inter"
          onClick={() => {
            navigate(ROUTE_MAIN);
          }}
        >
          <img src={logo} />
        </div>
      </div>
      <div className="title-container">
        <div className="title">{t("Sign In")}</div>
        <div className="description">
          {t("Please sign in to your account.")}
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col className="col-12">
            <p>{t("Select Role")}</p>
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
          <Col className="col-12">
            {formik.values.type === "USER" ? (
              <InputComponent
                label={t("Email")}
                fullWidth
                InnerPlaceholder={t("Enter email")}
                name="id"
                formik={formik}
                disabled={loading}
                renderIcon={
                  <>
                    <EmailOutlinedIcon />
                  </>
                }
                hasIcon
              />
            ) : (
              <InputComponent
                label={t("Mobile Or Email")}
                fullWidth
                InnerPlaceholder={t("Enter Mobile Number or Email")}
                name="id"
                type="text"
                formik={formik}
                disabled={loading}
                renderIcon={
                  <>
                    <PermIdentityIcon />
                  </>
                }
                hasIcon
              />
            )}
          </Col>
          <Col className="col-12">
            <InputComponent
              label={t("Password")}
              fullWidth
              InnerPlaceholder={t("Enter password")}
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
          <Col className="col-12 ">
            <FlexBox>
              <FlexBox justifyContent="flex-start remember-me">
                <Checkbox
                  checked={formik.values.isCheckedRememberMe}
                  onClick={handleCheckRemember}
                />
                <span>{t("Remember me?")}</span>
              </FlexBox>
              <Link to="/forget-password" className="forgot-password-text">
                {t("Forgot Password")}
              </Link>
            </FlexBox>
          </Col>
          <Col className="col-12 buttons ">
            <ButtonComponent
              type="submit"
              variant="contained"
              size="large"
              text={t("Sign In")}
              width="100%"
              disabled={loading}
            />
          </Col>
          {!maxWidth && (
            <Col className="col-12">
              <div className="info-text">
                <span>{t("Don't have an account?")}</span>
                <Link to={ROUTE_SIGN_UP}>{t("Sign Up")}</Link>
              </div>
            </Col>
          )}
        </Row>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
