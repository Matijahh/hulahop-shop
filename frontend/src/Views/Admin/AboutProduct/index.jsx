import React, { useCallback, useEffect, useState } from "react";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import Tables from "../../../components/SuperAdmin/Tables";
import { renderHeader } from "./mock";
import map from "lodash/map";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";
import {
  ROUTE_ADMIN_ABOUT_PRODUCT_ADD,
  ROUTE_ADMIN_ABOUT_PRODUCT_EDIT,
} from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { get, size, debounce } from "lodash";
import { LoaderContainer } from "../../../components/Loader";
import ModalComponent from "../../../components/ModalComponent";

const AboutProduct = () => {
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);
  const [aboutProductData, setAboutProductData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSelectedProduct();
    }
  };

  const handleOpenToggle = (id) => {
    if (id) {
      setIsOpen(true);
      setSelectedProduct(id);
    }
  };

  const getAboutProductData = async () => {
    setLoading(true);
    const response = await commonGetQuery("/about-product-data");
    if (response) {
      const { data } = response.data;
      setAboutProductData(data);
      setLoading(false);
    }
    setLoading(false);
  };

  const setTableRenderData = (data) => {
    // setLoading(true);
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      category_name: get(item, "category.name"),
      sub_category_name: get(item, "sub_category.name"),
      id: item.id,
      // status: item.status ? "Active" : "In Active",
      handleOpenToggle,
      EditAboutProduct,
    }));
    // setLoading(false);

    return renderData;
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await commonAddUpdateQuery(
      `/about-product-data/${id}`,
      null,
      "DELETE"
    );
    if (response) {
      getAboutProductData();
    }
    handleToggle();
    setLoading(false);
  };

  const EditAboutProduct = (id) => {
    let route = ROUTE_ADMIN_ABOUT_PRODUCT_EDIT.replace(":id", id);
    navigation(route);
  };

  const filterItems = (query) => {
    return aboutProductData.filter(
      (item) =>
        item?.category?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        item?.sub_category?.name?.toLowerCase()?.includes(query?.toLowerCase())
    );
  };

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

  const handleChange = (event) => {
    const value = event.target.value.trim();
    setSearchText(value);
    debouncedHandleSearch(value);
  };

  useEffect(() => {
    getAboutProductData();
  }, []);
  return (
    <CommonWhiteBackground>
      <FlexBox className="mb-4">
        <div className="main-title ">About Product Data</div>
        <FlexBox>
          <InputComponent
            type="search"
            label="Search About Product Data"
            value={searchText}
            onChange={handleChange}
          />
          <ButtonComponent
            variant="contained"
            startIcon={<AddIcon />}
            text="Add Product Data"
            onClick={() => navigation(ROUTE_ADMIN_ABOUT_PRODUCT_ADD)}
          />
        </FlexBox>
      </FlexBox>
      {loading && <LoaderContainer />}
      <Tables
        body={
          isSearch
            ? size(searchFilterData) > 0
              ? setTableRenderData(searchFilterData)
              : []
            : size(aboutProductData) > 0
            ? setTableRenderData(aboutProductData)
            : []
        }
        header={renderHeader}
      />
      <ModalComponent
        title="Delete About Product Data"
        size={"m"}
        open={isOpen}
        handleClose={handleToggle}
      >
        <p>Are you sure want to delete</p>
        <>
          <FlexBox hasBorderTop={true} className="pt-3 mt-3">
            <ButtonComponent
              className=""
              variant="outlined"
              fullWidth
              text="Cancel"
              onClick={handleToggle}
            />
            <ButtonComponent
              variant="contained"
              fullWidth
              text="Delete Product Data"
              type="button"
              onClick={() => {
                handleDelete(selectedProduct);
              }}

              // loading={loading}
            />
          </FlexBox>
        </>
      </ModalComponent>
    </CommonWhiteBackground>
  );
};

export default AboutProduct;
