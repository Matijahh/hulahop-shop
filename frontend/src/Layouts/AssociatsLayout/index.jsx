import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { SuperAdminLayoutContainer } from "./styled";
import { Button } from "@mui/material";
import {
  getUserType,
  handlePublicRedirection,
} from "../../Utils/commonFunctions";

const SuperAdminLayout = (props) => {
  const { children } = props;

  const checkRedirection = () => {
    const remember_me = localStorage.getItem("rememberme");
    const remember_me_token = Cookies.get("remember_me_token");
    if (!remember_me && !remember_me_token) {
      handlePublicRedirection(getUserType(), true);
    }
  };

  useEffect(() => {
    checkRedirection();
  }, []);

  return (
    <SuperAdminLayoutContainer>
      <Sidebar {...props} />
      <div className="main-container">{children}</div>
    </SuperAdminLayoutContainer>
  );
};

export default SuperAdminLayout;
