import { useState, useEffect } from "react";
import cx from "classnames";
import { Helmet } from "react-helmet";
import { get, map, size } from "lodash";

import Main from "./Main";
import { useTranslation } from "react-i18next";
import CategorySidebarUser from "../../../components/SuperAdmin/CategorySidebar/CategorySidebarUser";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SliderSecction from "../../Associats/BrandShop/Home/SliderSecction";
import { HomeContainer } from "../../Associats/BrandShop/Home/styled";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { LoaderContainer } from "../../../components/Loader";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import { getImageUrlById } from "../../../utils/commonFunctions";

const Shop = (props) => {
  const { t } = useTranslation();

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shopSliderList, setShopSliderList] = useState();
  const [mainLoading, setMainLoading] = useState(false);
  const toggleMenu = (state = !menuIsOpen) => {
    setMenuIsOpen(state);
  };

  const getShopSliderList = async () => {
    setLoading(true);
    const response = await commonGetQuery("/shop_slider");
    if (response) {
      const { data } = response.data;
      setShopSliderList(data);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getShopSliderList();
  }, []);

  return (
    <HomeContainer>
      {loading && <LoaderContainer />}
      <div className="shop-page page-wrapper">
        <Helmet>
          <title>{t("Shop Page - HulaHop")}</title>
        </Helmet>
        {window.location.pathname === "/shop" ? (
          <div className="shop-hero-section">
            <div className="shop-slider">
              <SliderComponent dots={false} arrows={true} slidesToShow={1}>
                {size(shopSliderList) > 0 &&
                  map(shopSliderList, (item, index) => {
                    return (
                      <div className="product-slide">
                        <div
                          className="product-slide-box"
                          style={{
                            backgroundImage: `url(${getImageUrlById(
                              get(item, "image_id", "")
                            )})`,
                          }}
                        >
                          <div className="container">
                            {/* <img src={associate1} alt="" /> */}
                            <div className="description-box">
                              {/* <p className="category-name">Textiles</p> */}
                              <h5>{t(get(item, "description", ""))} </h5>
                              {/* <ButtonComponent
                    text="View Collection"
                    variant="outlined"
                    className="category-view-btn"
                  /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </SliderComponent>
            </div>
          </div>
        ) : (
          <SliderSecction data={props.data} />
        )}

        <div className="shop-product-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="hero-section">
                  <h3 className="banner-head">{t("Products For You")}</h3>
                </div>
              </div>
              <div className="col-12">
                <div className="open-menu-box">
                  <div
                    className="open-menu"
                    onClick={() => {
                      toggleMenu();
                    }}
                  >
                    <div className="icon-box">
                      <MenuOutlinedIcon />
                    </div>
                    <span>View Categories</span>
                  </div>
                </div>
                <div
                  className={cx(
                    "shop-products-box",
                    menuIsOpen && "category-sidebar-open"
                  )}
                >
                  <div className="shop-category-sidebar">
                    <div className="category-sidebar-wrapper">
                      <CategorySidebarUser
                        {...props}
                        className="shop-categories"
                        setMainLoading={setMainLoading}
                        mainLoading={mainLoading}
                      />
                    </div>
                  </div>
                  <div className="shop-products-listing">
                    <Main
                      {...props}
                      setMainLoading={setMainLoading}
                      mainLoading={mainLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeContainer>
  );
};

export default Shop;
