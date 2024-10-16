import React, { useEffect } from "react";
import Cookies from "js-cookie";

import Footer from "./Footer";
import Header from "./Header";
import {
  getUserType,
  handlePublicRedirection,
} from "../../utils/commonFunctions";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default PrivateLayout;
