import { NavLink } from "react-router-dom";
import {
  ROUTE_MAIN_ABOUT_PRODUCT,
  ROUTE_MAIN_SHOP,
} from "../../../routes/routes";
// import { i18n } from "react-i18next";
import { map, size } from "lodash";
import i18next from "i18next";
// const { t } = useTranslation();

export const menuItemsData = (data, name) => {
  let dropdownArray = [];
  if (size(data) > 0) {
    dropdownArray = data.map((category) => ({
      label: (
        <NavLink
          to={ROUTE_MAIN_SHOP + `?categoryId=${category.id || 0}`}
          className="dropdown-link"
        >
          {i18next.t(category.name)}
        </NavLink>
      ),
      items: category.sub_categories.map((subcategory) => ({
        label: (
          <NavLink
            to={
              ROUTE_MAIN_SHOP +
              `?categoryId=${category.id || 0}&sub_categoryId=${
                subcategory.id || 0
              }`
            }
            className="dropdown-link"
          >
            {i18next.t(subcategory.name)}
          </NavLink>
        ),
      })),
    }));
  }
  return {
    label: (
      <NavLink
        to={ROUTE_MAIN_SHOP}
        className={(navData) => (navData.isActive ? "active-nav" : "none")}
      >
        {name}
        {/* Shop */}
        {/* {t("Shop")} */}
      </NavLink>
    ),
    items: dropdownArray,
  };
};

export const menuAboutProductData = (data, name) => {
  let dropdownArray = [];
  if (size(data) > 0) {
    dropdownArray = data.map((category) => ({
      label: (
        <NavLink
          // to={ROUTE_MAIN_ABOUT_PRODUCT + `?categoryId=${category.id || 0}`}
          to="#"
          className="dropdown-link"
        >
          {i18next.t(category.name)}
        </NavLink>
      ),
      items: category.sub_categories.map((subcategory) => ({
        label: (
          <NavLink
            to={
              ROUTE_MAIN_ABOUT_PRODUCT +
              `?categoryId=${category.id || 0}&sub_categoryId=${
                subcategory.id || 0
              }`
            }
            className="dropdown-link"
          >
            {i18next.t(subcategory.name)}
          </NavLink>
        ),
      })),
    }));
  }
  return {
    label: (
      <NavLink
        to="javascript:void(0);"
        // to="#"
        className={(navData) => (navData.isActive ? "active-nav" : "none")}
      >
        {name}
        {/* About Product */}
        {/* {t("The Shop")} */}
      </NavLink>
    ),
    items: dropdownArray,
  };
};
