import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  renderAboutSliderHeader,
  renderBlogSliderHeader,
  renderShopSliderHeader,
} from "./mock";
import map from "lodash/map";
import {
  ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_ADD,
  ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_EDIT,
  ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_ADD,
  ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_EDIT,
  ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_ADD,
  ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_EDIT,
} from "../../../routes/routes";
import { get, size } from "lodash";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";

import Tables from "../../../components/SuperAdmin/Tables";
import ButtonComponent from "../../../components/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";

const Appearance = () => {
  const [loading, setLoading] = useState(false);
  const [shopSliderList, setShopSliderList] = useState([]);
  const [aboutSliderList, setAboutSliderList] = useState([]);
  const [blogSliderList, setBlogSliderList] = useState([]);

  const navigation = useNavigate();
  const { t } = useTranslation();

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

  const getAboutSliderList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/about_page_slider");

    if (response) {
      const { data } = response.data;
      setAboutSliderList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const getBlogSliderList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/blog_page_slider");

    if (response) {
      const { data } = response.data;
      setBlogSliderList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const setShopSliderTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      image_id: item.image_id,
      description: get(item, "description", ""),
      id: get(item, "id", ""),
      status: item.status ? t("Active") : t("Inactive"),
      handleDeleteShopSlider,
      handleEditShopSlider,
    }));
    return renderData;
  };
  const setAboutSliderTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      image_id: item.image_id,
      description: get(item, "description", ""),
      id: get(item, "id", ""),
      status: item.status ? t("Active") : t("Inactive"),
      handleDeleteAboutSlider,
      handleEditAboutSlider,
    }));
    return renderData;
  };

  const setBlogSliderTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      image_id: item.image_id,
      description: get(item, "description", ""),
      id: get(item, "id", ""),
      status: item.status ? t("Active") : t("Inactive"),
      handleDeleteBlogSlider,
      handleEditBlogSlider,
    }));
    return renderData;
  };

  const handleDeleteBlogSlider = async (id) => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/blog_page_slider/${id}`,
      null,
      "DELETE"
    );

    if (response) {
      getBlogSliderList();
    }

    setLoading(false);
  };

  const handleEditBlogSlider = async (id) => {
    const route = ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_EDIT.replace(":id", id);
    navigation(route);
  };

  const handleDeleteShopSlider = async (id) => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/shop_slider/${id}`,
      null,
      "DELETE"
    );

    if (response) {
      getShopSliderList();
    }

    setLoading(false);
  };

  const handleEditShopSlider = (id) => {
    let route = ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_EDIT.replace(":id", id);
    navigation(route);
  };

  const handleDeleteAboutSlider = async (id) => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/about_page_slider/${id}`,
      null,
      "DELETE"
    );

    if (response) {
      getAboutSliderList();
    }

    setLoading(false);
  };

  const handleEditAboutSlider = (id) => {
    let route = ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_EDIT.replace(":id", id);
    navigation(route);
  };

  useEffect(() => {
    getAboutSliderList();
    getShopSliderList();
    getBlogSliderList();
  }, []);

  return (
    <div>
      <div className="w-100 mb-4">
        <CommonWhiteBackground>
          <FlexBox className="mb-4">
            <div className="main-title ">{t("Shop Slider")}</div>
            <FlexBox>
              <ButtonComponent
                variant="contained"
                startIcon={<AddIcon />}
                text={t("Add Slide")}
                onClick={() =>
                  navigation(ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_ADD)
                }
              />
            </FlexBox>
          </FlexBox>
          <Tables
            body={
              size(shopSliderList) > 0
                ? setShopSliderTableRenderData(shopSliderList)
                : []
            }
            header={renderShopSliderHeader.map((item) => ({
              ...item,
              headerName: t(item.headerName),
            }))}
          />{" "}
        </CommonWhiteBackground>
      </div>

      <div className="w-100 mb-4">
        <CommonWhiteBackground>
          <FlexBox className="mb-4">
            <div className="main-title ">{t("About Page Slider")}</div>
            <FlexBox>
              <ButtonComponent
                variant="contained"
                startIcon={<AddIcon />}
                text={t("Add Slide")}
                onClick={() =>
                  navigation(ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_ADD)
                }
              />
            </FlexBox>
          </FlexBox>
          <Tables
            body={
              size(aboutSliderList) > 0
                ? setAboutSliderTableRenderData(aboutSliderList)
                : []
            }
            header={renderAboutSliderHeader.map((item) => ({
              ...item,
              headerName: t(item.headerName),
            }))}
          />{" "}
        </CommonWhiteBackground>
      </div>
      {loading && <LoaderContainer />}
      <div className="w-100 mb-4">
        <CommonWhiteBackground>
          <FlexBox className="mb-4">
            <div className="main-title">{t("Blog Page Slider")}</div>
            <FlexBox>
              <ButtonComponent
                variant="contained"
                startIcon={<AddIcon />}
                text={t("Add Slide")}
                onClick={() =>
                  navigation(ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_ADD)
                }
              />
            </FlexBox>
          </FlexBox>
          <Tables
            body={
              size(blogSliderList) > 0
                ? setBlogSliderTableRenderData(blogSliderList)
                : []
            }
            header={renderBlogSliderHeader.map((item) => ({
              ...item,
              headerName: t(item.headerName),
            }))}
          />{" "}
        </CommonWhiteBackground>
      </div>
    </div>
  );
};

export default Appearance;
