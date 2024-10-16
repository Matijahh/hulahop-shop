import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import cx from "classnames";
import {
  ROUTE_MAIN,
  ROUTE_MAIN_SHOP,
  ROUTE_MAIN_ABOUT_PLATFORM,
  ROUTE_MAIN_ABOUT_PRODUCT,
  ROUTE_MAIN_ASSOCIETS,
  ROUTE_MAIN_BLOG,
  ROUTE_MAIN_CONTACT,
  ROUTE_MAIN_DESIGN_IT_YOUR_SELF,
  ROUTE_MAIN_INSTRUCTIONS,
} from "../../../routes/routes";
import { NestedDropdown } from "mui-nested-menu";
import { connect } from "react-redux";
import * as Action from "../../../Redux/actions";
import { isEmpty, size } from "lodash";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { menuAboutProductData, menuItemsData } from "./mock";
import CloseIcon from "@mui/icons-material/Close";

const BottomHeader = (props) => {
  const {
    shopCategoryDataList,
    saveShopCategoryList,
    menuIsOpen,
    toggleMenu,
    popoverRef,
  } = props;
  const { t } = useTranslation();
  const [categoryLoading, setCategoryLoading] = useState(false);

  const getAllCategory = async () => {
    setCategoryLoading(true);
    const response = await commonGetQuery("/categories");
    setCategoryLoading(false);
    if (response) {
      const { data } = response.data;

      saveShopCategoryList(data);
    }
  };

  useEffect(() => {
    if (size(shopCategoryDataList) <= 0 || isEmpty(shopCategoryDataList)) {
      getAllCategory();
    }
  }, []);

  return (
    <div className="header-bottom-area">
      <div className="container-fluid container-lg">
        <header className="header-main-user">
          <div className="header-menu-user">
            <nav
              className={cx("nav-user", menuIsOpen && "open")}
              ref={popoverRef}
            >
              <div className="close-menu-box">
                <div
                  className="close-menu"
                  onClick={() => {
                    toggleMenu(false);
                  }}
                >
                  <CloseIcon />
                </div>
              </div>
              <ul>
                <li>
                  <NavLink
                    to={ROUTE_MAIN}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("Home")}
                  </NavLink>
                </li>
                <li>
                  {/* <NavLink
                    to={ROUTE_MAIN_SHOP}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("Shop")}
                  </NavLink> */}
                  <NestedDropdown
                    menuItemsData={menuItemsData(
                      shopCategoryDataList,
                      t("Shop")
                    )}
                  />
                </li>
                <li>
                  <NavLink
                    to={ROUTE_MAIN_ABOUT_PLATFORM}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("About The Platform")}
                  </NavLink>
                </li>

                {/* <li>
                  <NavLink
                    to={ROUTE_MAIN_DESIGN_IT_YOUR_SELF}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("Design it yourself")}
                  </NavLink>
                </li> */}

                <li>
                  <NavLink
                    to={ROUTE_MAIN_ASSOCIETS}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("Asociates")}
                  </NavLink>
                </li>
                <li>
                  {/* <NavLink
                    to={ROUTE_MAIN_ABOUT_PRODUCT}
                    className={(navData) =>
                      navData.isActive ? "active-nav nested-route-link" : "none"
                    }
                  >
                    {t("About products")}
                  </NavLink>  */}
                  <NestedDropdown
                    menuItemsData={menuAboutProductData(
                      shopCategoryDataList,
                      t("About products")
                    )}
                  />
                </li>
                <li>
                  <NavLink
                    to={ROUTE_MAIN_BLOG}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("Blog")}
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to={ROUTE_MAIN_INSTRUCTIONS}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("Instructions")}
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to={ROUTE_MAIN_CONTACT}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("Contact")}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  shopCategoryDataList: state.user.shopCategoryDataList,
});

const mapDispatchToProps = {
  saveShopCategoryList: (data) => Action.saveShopCategoryList(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomHeader);
