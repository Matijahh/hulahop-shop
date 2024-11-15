import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { size, get } from "lodash";
import { ACCESS_TOKEN } from "../../../utils/constant";

import { Pagination } from "@mui/material";

import Product from "../../../components/Product/Product";

const Main = (props) => {
  const { setMainLoading, mainLoading } = props;

  const [loading, setLoading] = useState(false);
  const [associateProductsList, setAssociateProductsList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [wishListData, setWishListData] = useState([]);
  const [page, setPage] = useState(1);

  const params = useParams();
  const { t } = useTranslation();
  const limit = 20;

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

  const getAssociateProducts = async (
    categoryId,
    sub_categoryId,
    limit,
    page
  ) => {
    setLoading(true);
    setMainLoading(true);

    let url = `associate_products?limit=${limit}&page=${page}`;

    if (categoryId && categoryId !== "all") {
      url = `${url}&category_ids=${categoryId}`;

      if (sub_categoryId && sub_categoryId != 0) {
        url = `${url}&sub_category_ids=${sub_categoryId}`;
      }

      if (get(params, "id")) {
        url = `${url}&user_id=${get(params, "id")?.split("-")?.[1]}`;
      }
    } else {
      if (sub_categoryId && sub_categoryId != 0) {
        url = `${url}&sub_categoryId=${sub_categoryId}`;

        if (get(params, "id")) {
          url = `${url}&user_id=${get(params, "id")?.split("-")?.[1]}`;
        }
      } else if (get(params, "id")) {
        url = `${url}&user_id=${get(params, "id")?.split("-")?.[1]}`;
      }
    }

    const response = await commonGetQuery(url);

    if (response) {
      const { data } = response.data;

      setAssociateProductsList(data.data);
      setTotalPages(data.totalPages);
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

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const categoryId = url.searchParams.get("categoryId");
    const sub_categoryId = url.searchParams.get("sub_categoryId");
    getAssociateProducts(categoryId, sub_categoryId, limit, page);

    if (ACCESS_TOKEN) {
      getWishListData();
    }
  }, [params, page]);

  return (
    <div className="products-list-container">
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
            {t("No Product Found!")}
          </h5>
        )}
        {!loading && (
          <div className="pagination-container">
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={totalPages}
              shape="rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
