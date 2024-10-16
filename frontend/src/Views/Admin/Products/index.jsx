import React, { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import map from "lodash/map";

import InputComponent from "../../../components/InputComponent";
import Tables from "../../../components/SuperAdmin/Tables";
import ButtonComponent from "../../../components/ButtonComponent";
import { renderHeader } from "./mock";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";

import muska1 from "../../../assets/images/muska-1.jpg";
import { useNavigate } from "react-router-dom";
import {
  ROUTE_ADMIN_PRODUCTS_ADD,
  ROUTE_ADMIN_PRODUCTS_EDIT,
} from "../../../routes/routes";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { debounce, get, size } from "lodash";
import ModalComponent from "../../../components/ModalComponent";

const Products = () => {
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  const getProductList = async () => {
    setLoading(true);
    const response = await commonGetQuery("/products");
    if (response) {
      const { data } = response.data;
      setProductList(data);
      setLoading(false);
    }
    setLoading(false);
  };

  const setTableRenderData = (data) => {
    // setLoading(true);
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      product_image: item.image_id,
      product_description: get(item, "description", ""),
      id: get(item, "id", ""),
      price: get(item, "price", ""),
      // category: "Textiles",
      // sub_category: "T-shirt",
      colors: "Red, Yellow, Green",
      // sku: "#red_t_shirt",
      // date: "02/10/2023",
      // qty: "10",
      status: "Active",
      handleOpenToggle,
      EditProduct,
    }));
    // setLoading(false);

    return renderData;
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await commonAddUpdateQuery(
      `/products/${id}`,
      null,
      "DELETE"
    );
    if (response) {
      getProductList();
    }
    setLoading(false);
    handleToggle();
  };

  const EditProduct = (id) => {
    let route = ROUTE_ADMIN_PRODUCTS_EDIT.replace(":id", id);
    navigation(route);
  };

  const filterItems = (query) => {
    return productList.filter(
      (item) =>
        item?.name?.toLowerCase().includes(query.toLowerCase()) || // Search English
        item?.description?.toLowerCase().includes(query.toLowerCase()) // Search Serbian
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
    getProductList();
  }, []);

  return (
    <CommonWhiteBackground>
      <FlexBox className="mb-4">
        <div className="main-title ">Products</div>
        <FlexBox>
          <InputComponent
            type="search"
            label="Search Products"
            value={searchText}
            onChange={handleChange}
          />
          <ButtonComponent
            variant="contained"
            startIcon={<AddIcon />}
            text="Add Product"
            onClick={() => navigation(ROUTE_ADMIN_PRODUCTS_ADD)}
          />
        </FlexBox>
      </FlexBox>
      <Tables
        body={
          isSearch
            ? size(searchFilterData) > 0
              ? setTableRenderData(searchFilterData)
              : []
            : size(productList) > 0
            ? setTableRenderData(productList)
            : []
        }
        header={renderHeader}
      />
      <ModalComponent
        title="Delete Product"
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
              text="Delete Product"
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

export default Products;
