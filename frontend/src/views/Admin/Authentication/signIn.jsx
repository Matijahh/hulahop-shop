import React, { useState } from "react";
import { useFormik } from "formik";
import { Col, Row } from "react-bootstrap";
import { Checkbox } from "@mui/material";
import { connect } from "react-redux";
import * as Actions from "../../../redux/actions";
import * as Yup from "yup";
import qs from "querystring";
import cx from "classnames";

import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { Container, SignInContainer } from "./styled";
import { FlexBox } from "../../../components/Sections";
import logo from "../../../assets/images/logo.png";
import { commonAddUpdateQuery } from "../../../utils/axiosInstance";
import { SuccessTaster } from "../../../components/Toast";
// import Toast from "../../../components/Toast";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  handleRedirection,
  setTokenAfterLogin,
} from "../../../utils/commonFunctions";

const validation = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Please enter a valid password."
    ),
});

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: async (value) => {
      setLoading(true);
      const response = await commonAddUpdateQuery("/auth/login", { ...value });
      setLoading(false);
      if (response) {
        const { data, message } = response.data;
        if (data) {
          setTokenAfterLogin(response);
          handleRedirection(data.type);
          if (message) {
            SuccessTaster(message);
          }
        }
      }
    },
  });
  return (
    <Container justifyContent="center" alineItems="center">
      <SignInContainer>
        <div className="logo-container">
          <div className="cover">
            <img src={logo} />
          </div>
        </div>
        <div className="title-container">
          <div className="title">Admin Sign In</div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col className="col-12">
              <InputComponent
                label="Email"
                fullWidth
                InnerPlaceholder="Enter email"
                name="email"
                formik={formik}
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
                label="Password"
                fullWidth
                name="password"
                formik={formik}
                InnerPlaceholder="Enter password"
                renderIcon={
                  <>
                    <LockOutlinedIcon />
                  </>
                }
                hasIcon
                type="password"
              />
            </Col>
            <Col className="col-12 ">
              <FlexBox>
                <FlexBox justifyContent="flex-start remember-me">
                  <Checkbox />
                  <span>Remember me?</span>
                </FlexBox>
                {/* <Link href="#" className="forgot-password-text">
                Forgot Password
              </Link> */}
              </FlexBox>
            </Col>
            <Col className="col-12 buttons ">
              <ButtonComponent
                type="submit"
                variant="contained"
                size="large"
                text="Sign In"
                width="100%"
              />
            </Col>
          </Row>
        </form>
      </SignInContainer>
    </Container>
  );
};

export default SignIn;
