import React from "react";
import { connect } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import _get from "lodash/get";

import SliderSecction from "./SliderSecction";
import { HomeContainer } from "./styled";
import Products from "./Products";
import CommonCategorySidebar from "../../../../components/CommonCategorySidebar";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import get from "lodash/get";

const Home = ({ storeData }) => {
  const { t } = useTranslation();
  const getSocialUrl = (name) => {
    if (storeData && _get(storeData, "social_links")) {
      const obj = JSON.parse(_get(storeData, "social_links"));
      return obj[name];
    }
  };
  const handleOnSelectSocialIcon = (url) => {
    window.open(url, "_blank");
  };
  return (
    <HomeContainer>
      <Helmet>
        <title>
          {get(storeData, "name")
            ? get(storeData, "name")
            : t("Associate Shop - HulaHop")}
        </title>
      </Helmet>
      <SliderSecction data={storeData} />
      <div className="social-links">
        {getSocialUrl("ig_url") && (
          <div
            onClick={() => handleOnSelectSocialIcon(getSocialUrl("ig_url"))}
            target="_blank"
            className="social-links-item"
          >
            <InstagramIcon />
          </div>
        )}
        {getSocialUrl("fb_url") && (
          <div
            className="social-links-item"
            onClick={() => handleOnSelectSocialIcon(getSocialUrl("fb_url"))}
          >
            <FacebookIcon />
          </div>
        )}
        {getSocialUrl("yt_url") && (
          <div
            className="social-links-item"
            onClick={() => handleOnSelectSocialIcon(getSocialUrl("yt_url"))}
          >
            <YouTubeIcon />
          </div>
        )}
      </div>
      <Products />
      <CommonCategorySidebar isAssociate={true} />
    </HomeContainer>
  );
};

const mapStateToProps = (state) => ({
  storeData: state.user.storeData,
});

export default connect(mapStateToProps, null)(Home);
