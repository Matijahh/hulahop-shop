import React, { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import cx from "classnames";
import { ExpandLess, ExpandLessOutlined } from "@mui/icons-material";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { Loader } from "../../Loader";
import { useNavigate } from "react-router-dom";
import { ROUTE_ASSOCIATE_CREATE_PRODUCT } from "../../../routes/routes";
import * as Action from "../../../redux/actions";
import { connect } from "react-redux";

const CategorySidebarContainer = styled.div`
  .MuiPaper-root {
    box-shadow: none !important;
    max-width: 100%;
    width: 100%;
    &:before {
      background-color: transparent !important;
    }
  }
  .MuiAccordionSummary-content,
  .Mui-expanded {
    margin: 0px !important;
    min-height: auto !important;
  }
  .MuiButtonBase-root {
    padding: 0 !important;
    min-height: auto !important;
  }
  .MuiAccordionDetails-root {
    padding: 0 !important;
  }
  .category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    color: #9e9e9e;
    padding-bottom: 10px;
    width: 100%;
    &.active {
      color: rgba(241, 103, 109, 1);
      .category-item-numb {
        background-color: rgba(241, 103, 109, 1);
        color: #fff;
      }
    }
    .category-item-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .category-item-numb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #7e7e7e;
        margin-right: 10px;
        display: none;
      }
    }
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
  .sub-category-item {
    font-size: 18px;
    color: #7e7e7e;
    padding-bottom: 10px;
    width: 100%;
    margin-left: 20px;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const CategorySidebar = ({ className, saveShopCategoryList }) => {
  const navigation = useNavigate();
  const [selectedId, setSelectedId] = useState("all");
  const [subSelectedId, setSubSelectedId] = useState("all");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getAllCategory = async () => {
    setCategoryLoading(true);
    const response = await commonGetQuery("/categories");
    setCategoryLoading(false);
    if (response) {
      const { data } = response.data;
      setCategories([
        {
          id: "all",
          name: "All",
        },
        ...data,
      ]);
      saveShopCategoryList([
        {
          id: "all",
          name: "All",
        },
        ...data,
      ]);
    }
  };

  const toggle = (id, subId) => {
    setSelectedId(id);
    setSubSelectedId(subId);
    navigation(
      ROUTE_ASSOCIATE_CREATE_PRODUCT.replace(":categoryId", id).replace(
        ":sub_categoryId",
        subId || 0
      )
    );
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <CategorySidebarContainer>
      {categoryLoading ? (
        <Loader />
      ) : (
        <>
          {categories.map((item, i) => (
            <Accordion
              key={i}
              expanded={item.id === selectedId}
              onClick={() => toggle(item.id)}
              className={className}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div
                  className={`category-item ${
                    item.id === selectedId && "active"
                  }`}
                >
                  <div className={`category-item-title `}>{item.name}</div>
                  {item.sub_categories && (
                    <div
                      className={`category-item-right ${
                        item.id === selectedId && "active"
                      }`}
                    >
                      <div className="category-item-numb">
                        {item.sub_categories.length}
                      </div>
                      {item.id === selectedId ? (
                        <ExpandLessOutlined />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </div>
                  )}
                </div>
              </AccordionSummary>
              {item.sub_categories &&
                item.sub_categories.map((subItem, i) => (
                  <AccordionDetails key={`demo-${i}`}>
                    <div
                      className={cx(
                        "sub-category-item",
                        subItem.id === subSelectedId && "active"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(item.id, subItem.id);
                      }}
                    >
                      {subItem.name}
                    </div>
                  </AccordionDetails>
                ))}
            </Accordion>
          ))}
        </>
      )}
    </CategorySidebarContainer>
  );
};

const mapDispatchToProps = {
  saveShopCategoryList: (data) => Action.saveShopCategoryList(data),
};

export default connect(null, mapDispatchToProps)(CategorySidebar);
