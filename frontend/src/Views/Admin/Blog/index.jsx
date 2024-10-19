import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { renderHeader } from "./mock";
import {
  ROUTE_ADMIN_BLOG_ADD,
  ROUTE_ADMIN_BLOG_EDIT,
} from "../../../routes/routes";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { get, size, debounce } from "lodash";
import inspiration from "../../../assets/images/inspiration.jpg";
import map from "lodash/map";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";

import InputComponent from "../../../components/InputComponent";
import Tables from "../../../components/SuperAdmin/Tables";
import ButtonComponent from "../../../components/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";

const Blog = () => {
  const [loading, setLoading] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigation = useNavigate();
  const { t } = useTranslation();

  const getBlogList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/blogs");

    if (response) {
      const { data } = response.data;
      setBlogList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      id: get(item, "id", ""),
      heading: get(item, "heading", ""),
      image_id: get(item, "image_id", ""),
      category_name: get(item, "category_name", ""),
      content: get(item, "content", ""),
      handleDelete,
      EditColor,
    }));

    return renderData;
  };

  const handleDelete = async (id) => {
    setLoading(true);

    const response = await commonAddUpdateQuery(`/blogs/${id}`, null, "DELETE");

    if (response) {
      getBlogList();
    }

    setLoading(false);
  };

  const EditColor = (id) => {
    let route = ROUTE_ADMIN_BLOG_EDIT.replace(":id", id);
    navigation(route);
  };

  useEffect(() => {
    getBlogList();
  }, []);

  const filterItems = (query) => {
    return blogList.filter(
      (item) =>
        item?.heading?.toLowerCase()?.includes(query?.toLowerCase()) ||
        item?.category_name?.toLowerCase()?.includes(query?.toLowerCase())
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
    const value = event.target.value;
    setSearchText(value);
    debouncedHandleSearch(value);
  };

  return (
    <CommonWhiteBackground>
      {loading && <LoaderContainer />}

      <FlexBox className="mb-4">
        <div className="main-title ">{t("Blogs")}</div>
        <FlexBox>
          <InputComponent
            type="search"
            label={t("Search Blogs")}
            value={searchText}
            onChange={handleChange}
          />
          <ButtonComponent
            variant="contained"
            startIcon={<AddIcon />}
            text={t("Add Blog")}
            onClick={() => navigation(ROUTE_ADMIN_BLOG_ADD)}
          />
        </FlexBox>
      </FlexBox>
      <Tables
        body={
          isSearch
            ? size(searchFilterData) > 0
              ? setTableRenderData(searchFilterData)
              : []
            : size(blogList) > 0
            ? setTableRenderData(blogList)
            : []
        }
        header={renderHeader.map((item) => ({
          ...item,
          headerName: item.headerName,
        }))}
      />
    </CommonWhiteBackground>
  );
};
export default Blog;
