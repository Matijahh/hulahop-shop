import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { renderHeader } from "./mock";
import { ROUTE_ADMIN_ASSOCIATE_EDIT_PRODUCTS } from "../../../routes/routes";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import map from "lodash/map";
import { getImageUrlById } from "../../../utils/commonFunctions";
import { debounce, get, size } from "lodash";

import InputComponent from "../../../components/InputComponent";
import Tables from "../../../components/SuperAdmin/Tables";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";

const AssociatesProducts = () => {
  const [loading, setLoading] = useState(false);
  const [associateProductsList, setAssociateProductsList] = useState([]);
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigate();
  const { t } = useTranslation();

  const getAssociateProducts = async () => {
    setLoading(true);
    const response = await commonGetQuery("/associate_products");
    if (response) {
      const { data } = response.data;
      setAssociateProductsList(data);
      setLoading(false);
    }
    setLoading(false);
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => {
      return {
        ...item,
        no: `${index + 1}`,
        product_image: get(item, "product.image_id", ""),
        product_description: get(item, "description", ""),
        id: get(item, "id"),
        base_price: get(item, "product.price", ""),
        associate_price: get(item, "price"),
        price_margine:
          Number(get(item, "price")) - Number(get(item, "product.price")),
        category: get(item, "product.category.name", ""),
        previewImageUrl: getImageUrlById(
          get(item, "product.product_variants.0.image_id")
        ),
        json: get(item, "image_json.imageObj", "")
          ? JSON.parse(get(item, "image_json.imageObj", ""))
          : null,

        productData: item,
        isBestSelling: get(item, "best_selling", false),
        status: item.is_approve ? "Active" : "In Active",
        handleDelete,
        EditAssociateProducts,
        handleBestSellingImage,
      };
    });

    return renderData;
  };

  const handleBestSellingImage = async (isBestSelling, id) => {
    setLoading(true);
    const response = await commonAddUpdateQuery(
      `/associate_products/best_selling/${id}`,
      { best_selling: !isBestSelling },
      "PATCH"
    );
    if (response) {
      getAssociateProducts();
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/associate_products/${id}`,
      null,
      "DELETE"
    );

    if (response) {
      getAssociateProducts();
    }

    setLoading(false);
  };

  const EditAssociateProducts = (id, associate_p_id) => {
    let route = `${ROUTE_ADMIN_ASSOCIATE_EDIT_PRODUCTS.replace(
      ":productId",
      associate_p_id
    )}?edit=${id}`;
    navigation(route);
  };

  const filterItems = (query) => {
    return associateProductsList.filter(
      (item) =>
        item?.name?.toLowerCase().includes(query.toLowerCase()) || // Search English
        item?.description?.toLowerCase().includes(query.toLowerCase()) || // Search Serbian
        item?.product?.category?.name
          .toLowerCase()
          .includes(query.toLowerCase()) // Search Serbian
    );
  };

  // Debounced version of handleSearch
  const debouncedHandleSearch = useCallback(
    debounce((query) => {
      if (query) {
        setIsSearch(true);
      } else {
        setIsSearch(false);
      }
      const filteredItems = filterItems(query);
      setSearchFilterData(filteredItems);
    }, 1000),
    [searchText]
  );

  // Event handler for input change
  const handleChange = (event) => {
    const value = event.target.value.trim();
    setSearchText(value);
    debouncedHandleSearch(value);
  };

  useEffect(() => {
    getAssociateProducts();
  }, []);

  return (
    <>
      {loading && <LoaderContainer />}

      <CommonWhiteBackground>
        <FlexBox className="mb-4">
          <div className="main-title ">{t("Associate Products")}</div>
          <FlexBox>
            <InputComponent
              type="search"
              label={t("Search Associate Products")}
              value={searchText}
              onChange={handleChange}
            />
          </FlexBox>
        </FlexBox>
        <Tables
          body={
            isSearch
              ? size(searchFilterData) > 0
                ? setTableRenderData(searchFilterData)
                : []
              : size(associateProductsList) > 0
              ? setTableRenderData(associateProductsList)
              : []
          }
          header={renderHeader.map((item) => ({
            ...item,
            headerName: t(item.headerName),
          }))}
        />
      </CommonWhiteBackground>
    </>
  );
};

export default AssociatesProducts;
