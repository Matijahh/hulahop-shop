import React, { useEffect, useState } from "react";
import Product from "../../../components/Product/Product";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { size, get } from "lodash";
import { useParams } from "react-router-dom";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { Loader } from "../../../components/Loader";

const Main = (props) => {
  const { setMainLoading, mainLoading } = props;
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [associateProductsList, setAssociateProductsList] = useState([]);
  const [wishListData, setWishListData] = useState([]);

  const getWishListData = async () => {
    setLoading(true);
    const response = await commonGetQuery("/wishlist");
    if (response) {
      const { data } = response.data;
      setWishListData(data);
      setLoading(false);
    }
    setLoading(false);
  };
  const getAssociateProducts = async (categoryId, sub_categoryId) => {
    setLoading(true);
    setMainLoading(true);
    let url = "associate_products";

    if (categoryId && categoryId !== "all") {
      url = `${url}?category_ids=${categoryId}`;
      if (sub_categoryId && sub_categoryId != 0) {
        url = `${url}&sub_category_ids=${sub_categoryId}`;
      }
      if (get(params, "id")) {
        url = `${url}&user_id=${get(params, "id")?.split("-")?.[1]}`;
      }
    } else {
      if (sub_categoryId && sub_categoryId != 0) {
        url = `${url}?sub_categoryId=${sub_categoryId}`;
        if (get(params, "id")) {
          url = `${url}&user_id=${get(params, "id")?.split("-")?.[1]}`;
        }
      } else if (get(params, "id")) {
        url = `${url}?user_id=${get(params, "id")?.split("-")?.[1]}`;
      }
    }
    const response = await commonGetQuery(url);
    if (response) {
      const { data } = response.data;
      setAssociateProductsList(data);
      setLoading(false);
      setMainLoading(false);
    } else {
      setMainLoading(false);
    }
    setLoading(false);
  };

  const checkIsInWishList = (id) => {
    if (wishListData.length > 0) {
      return wishListData.find((item) => item.associate_product_id == id);
    }
  };
  // const url = new URL(window.location.href);
  useEffect(() => {
    const url = new URL(window.location.href);
    const categoryId = url.searchParams.get("categoryId");
    const sub_categoryId = url.searchParams.get("sub_categoryId");
    getAssociateProducts(categoryId, sub_categoryId);
    if (ACCESS_TOKEN) {
      getWishListData();
    }
  }, [params]);

  return (
    <div className="products-list-container">
      {/* {(loading || mainLoading || true) && <Loader />} */}
      <div className="row g-3">
        {size(associateProductsList) > 0 ? (
          associateProductsList.map((item, i) => (
            <div className="col-sm-6 col-xl-4 col-xxl-3" key={i}>
              <Product
                mainLoading={mainLoading || loading}
                productData={item}
                isAssociateProduct={props.isAssociateProduct}
                isInWishList={checkIsInWishList(item.id)}
                getWishListData={getWishListData}
              />
            </div>
          ))
        ) : (
          <h5 className="d-flex align-items-center justify-content-center w-100 h-100">
            No Product Available
          </h5>
        )}
      </div>
    </div>
  );
};

export default Main;
