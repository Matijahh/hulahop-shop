import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import cx from "classnames";

import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PersonIcon from "@mui/icons-material/Person";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import { useTranslation } from "react-i18next";
import { InputAdornment, TextField } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";

import i18n from "../../../i18n";
import HeaderWrapperStyled from "./Styled";
import logo from "../../../assets/images/logo.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ROUTE_MAIN,
  ROUTE_MAIN_SHOP,
  ROUTE_MAIN_ABOUT_PLATFORM,
  ROUTE_MAIN_ABOUT_PRODUCT,
  ROUTE_MAIN_ASSOCIETS,
  ROUTE_MAIN_BLOG,
  ROUTE_MAIN_CONTACT,
  ROUTE_MAIN_CART,
  ROUTE_MAIN_PROFILE,
  ROUTE_MAIN_DESIGN_IT_YOUR_SELF,
  ROUTE_MAIN_INSTRUCTIONS,
  ROUTE_SIGN_IN,
} from "../../../routes/routes";
import languages from "../../../utils/languages";
import { filter, get, map } from "lodash";
import BottomHeader from "./BottomHeader";
import { ACCESS_TOKEN } from "../../../utils/constant";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const popoverRef = useRef(null);

  const toggleMenu = (state = !menuIsOpen) => {
    setMenuIsOpen(state);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsopen(!isOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsopen(false);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const changeLanguage = (lang) => {
    setSelectedLang(lang);
    i18n.changeLanguage();
    localStorage.setItem("I18N_LANGUAGE", lang);
    window.location.reload();
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // const handleClickOutside = (event) => {
  //   // Close the popover if a click occurs outside of it
  //   if (popoverRef.current && !popoverRef.current.contains(event.target)) {
  //     setMenuIsOpen(false);
  //   }
  // };

  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
    setSelectedLang(currentLanguage);
    // Add event listener to the entire document
    // document.addEventListener("mousedown", handleClickOutside);

    // return () => {
    //   // Clean up the event listener when the component unmounts
    //   document.removeEventListener("mousedown", handleClickOutside);
    // };
  }, []);
  return (
    <>
      <HeaderWrapperStyled>
        <div className={cx("menu-wrapper", menuIsOpen && "open")}></div>
        <div className="header-top-area">
          <div className="container-fluid container-lg">
            <div className="flex-box-header">
              <div className="open-menu-box">
                <div
                  className="open-menu"
                  onClick={() => {
                    toggleMenu(true);
                  }}
                >
                  <MenuOutlinedIcon />
                </div>
              </div>
              <div className="contact-box order-2 order-lg-1 d-none d-md-block">
                <a href="tel:+381 63 54 03 73">
                  <LocalPhoneIcon />
                  +381 63 54 03 73
                </a>
              </div>
              <div className="header-slider-section order-1 order-lg-2">
                <Slider {...settings}>
                  <h3 className="header-slider-text">
                    {t("Free postage over 6000 dinars")}
                  </h3>
                  <h3 className="header-slider-text">
                    {t("Possible return of goods")}
                  </h3>
                  <h3 className="header-slider-text">
                    {t("Safe and fast delivery")}
                  </h3>
                </Slider>
              </div>
              <div className="top-area-end order-3">
                <div className="flex-box-header">
                  <div className="language-transfer-tab">
                    <Button
                      aria-describedby={isOpen ? "simple-popover" : undefined}
                      variant="contained"
                      onClick={handleClick}
                    >
                      <span>{get(languages, `${selectedLang}.label`)}</span>{" "}
                      <ArrowDownwardIcon />
                    </Button>
                    <Popover
                      id={isOpen ? "simple-popover" : undefined}
                      open={isOpen}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <div className="language-popove-body">
                        {map(Object.keys(languages), (key) => (
                          <p
                            onClick={() => changeLanguage(key)}
                            className={selectedLang == key ? "active-lang" : ""}
                          >
                            {get(languages, `${key}.label`)}
                          </p>
                        ))}
                      </div>
                    </Popover>
                  </div>
                  <div className="social-tab d-none d-sm-flex">
                    <div className="social-icon">
                      <Link href="#">
                        <FacebookIcon />
                      </Link>
                    </div>
                    <div className="social-icon">
                      <Link href="#">
                        <InstagramIcon />
                      </Link>
                    </div>
                    <div className="social-icon">
                      <Link href="#">
                        <YouTubeIcon />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex d-lg-none middle-area-end order-4">
                <div>
                  <p>{t("Become Seller")}</p>
                </div>
                <div className="profile-box">
                  <NavLink
                    to={ACCESS_TOKEN ? ROUTE_MAIN_PROFILE : ROUTE_SIGN_IN}
                  >
                    <PersonIcon />
                  </NavLink>
                </div>
                <div className="cart-box">
                  <NavLink to={ROUTE_MAIN_CART}>
                    <LocalMallIcon />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle-area">
          <div className="container-fluid container-lg">
            <div className="flex-box-header">
              <div
                className="logo-box cursor-pointer"
                onClick={() => {
                  navigate(ROUTE_MAIN);
                }}
              >
                <img src={logo} alt="" />
              </div>
              <div className="search-box">
                <TextField
                  id="search"
                  type="search"
                  label={t("Search")}
                  size="small"
                  value={searchTerm}
                  onChange={handleChange}
                  sx={{ width: "100%", maxWidth: "420px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="middle-area-end d-none d-lg-flex">
                <div>
                  <p>{t("Become Seller")}</p>
                </div>
                <div className="profile-box">
                  <NavLink
                    to={ACCESS_TOKEN ? ROUTE_MAIN_PROFILE : ROUTE_SIGN_IN}
                  >
                    <PersonIcon />
                  </NavLink>
                </div>
                <div className="cart-box">
                  <NavLink to={ROUTE_MAIN_CART}>
                    <LocalMallIcon />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomHeader
          menuIsOpen={menuIsOpen}
          toggleMenu={toggleMenu}
          popoverRef={popoverRef}
        />
      </HeaderWrapperStyled>
    </>
  );
};

export default Header;
