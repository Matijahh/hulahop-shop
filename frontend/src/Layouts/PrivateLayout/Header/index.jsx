import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ROUTE_MAIN,
  ROUTE_MAIN_CART,
  ROUTE_MAIN_PROFILE,
  ROUTE_SIGN_IN,
} from "../../../routes/routes";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { get, map } from "lodash";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import cx from "classnames";
import i18n from "../../../i18n";
import languages from "../../../utils/languages";
import HeaderWrapperStyled from "./Styled";
import logo from "../../../assets/images/logo.png";

import Slider from "react-slick";
import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import LocalMallIcon from "@mui/icons-material/ShoppingCart";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BottomHeader from "./BottomHeader";
import SelectComponent from "../../../components/SelectComponent";

import { InputAdornment, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [langOptions, setLangOptions] = useState([]);
  const [langValue, setLangValue] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const popoverRef = useRef(null);

  const toggleMenu = (state = !menuIsOpen) => {
    setMenuIsOpen(state);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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

  const getUserData = async () => {
    const decoded = jwtDecode(ACCESS_TOKEN);

    const response = await commonGetQuery(`/users/${decoded.id}`);

    if (response) {
      const { data } = response.data;
      setUserData(data);
    }
  };

  const handleLangChange = (e) => {
    const selectedId = e.target && e.target.value.split(",")[0];
    setLangValue(e.target.value);
    i18n.changeLanguage();
    localStorage.setItem("I18N_LANGUAGE", selectedId);
    window.location.reload();
  };

  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
    getUserData();

    let langs = [];

    map(Object.keys(languages), (key) =>
      langs.push({
        id: key,
        title: get(languages, `${key}.label`),
      })
    );

    setLangOptions(langs);
    const selLang = langs.find((l) => l.id === currentLanguage);
    setLangValue(`${selLang?.id},${selLang?.title}`);
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
                    {t("Free Postage Over 6000 RSD")}
                  </h3>
                  <h3 className="header-slider-text">
                    {t("Possible Return of Goods")}
                  </h3>
                  <h3 className="header-slider-text">
                    {t("Safe and Fast Delivery")}
                  </h3>
                </Slider>
              </div>
              <div className="top-area-end order-3">
                <div className="flex-box-header">
                  <div className="language-transfer-tab">
                    {langValue && langOptions && (
                      <SelectComponent
                        width={120}
                        size="small"
                        name="title"
                        optionList={langOptions}
                        label={t("Select Language")}
                        value={langValue}
                        onChange={handleLangChange}
                        isShowValue={true}
                      />
                    )}
                  </div>
                  {/* For now comment it */}
                  {/* <div className="social-tab d-none d-sm-flex">
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
                  </div> */}
                </div>
              </div>
              <div className="d-flex d-lg-none middle-area-end order-4">
                <div>
                  <p>
                    {userData ? (
                      <span>{`${userData.first_name} ${userData.last_name}`}</span>
                    ) : (
                      t("Become Seller")
                    )}
                  </p>
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
                <div className="profile-box">
                  <NavLink
                    to={ACCESS_TOKEN ? ROUTE_MAIN_PROFILE : ROUTE_SIGN_IN}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <p>
                        {userData ? (
                          <span>{`${userData.first_name} ${userData.last_name}`}</span>
                        ) : (
                          t("Become Seller")
                        )}
                      </p>
                      <PersonIcon />
                    </div>
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
