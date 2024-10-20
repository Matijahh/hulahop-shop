import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cloneDeep } from "lodash";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { REST_URL_SERVER } from "../../../utils/constant";
import { Container } from "./styled";

import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import CategoriesForm from "./CategoriesForm";
import AddIcon from "@mui/icons-material/Add";
import ArrowUp from "@mui/icons-material/ArrowUpward";
import ArrowDown from "@mui/icons-material/ArrowDownward";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import ModalComponent from "../../../components/ModalComponent";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [isSelectedSubCategory, setIsSelectedSubCategory] = useState(false);
  const [activeOpenRow, setActiveOpenRow] = useState({
    id: 1,
    isOpen: false,
  });

  const { t } = useTranslation();

  const handleToggle = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      setSelectedItem(null);
    }
  };

  const handleToggleDeleteModel = () => {
    setIsOpenDeleteModel(!isOpenDeleteModel);

    if (isOpenDeleteModel) {
      setSelectedCategory();
      setIsSelectedSubCategory(false);
    }
  };

  const openToggleDeleteModel = (id, isSubCategory = false) => {
    if (id) {
      setSelectedCategory(id);
      setIsOpenDeleteModel(true);
      setIsSelectedSubCategory(isSubCategory);
    }
  };

  const handleEdit = (item, isSubCategory) => {
    setSelectedItem(isSubCategory ? { ...item, isSubCategory: true } : item);
    handleToggle();
  };

  const getCategoryData = async () => {
    setIsLoading(true);

    const response = await commonGetQuery("categories");

    setIsLoading(false);

    if (response) {
      const { data } = response.data;
      setCategoryData(data);
    }
  };

  const updateCategory = async (category) => {
    const { ...rest } = category;

    return commonAddUpdateQuery(
      `categories/${category.id}`,
      { ...rest },
      "PATCH"
    );
  };

  const handleUpdateSubCategory = async (subCategory) => {
    return commonAddUpdateQuery(
      `sub_categories/${subCategory.id}`,
      {
        ...subCategory,
      },
      "PATCH"
    );
  };

  const handleCollSpanRow = (activeId) => {
    setActiveOpenRow({
      id: activeId || false,
      isOpen: !activeOpenRow.isOpen,
    });
  };

  const handleDelete = async (id, isSubCategory) => {
    const response = await commonAddUpdateQuery(
      isSubCategory ? `/sub_categories/${id}` : `/categories/${id}`,
      null,
      "DELETE"
    );

    if (response) {
      getCategoryData();
    }

    handleToggleDeleteModel();
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const handleMoveUp = (index) => {
    const data = cloneDeep(categoryData);

    [data[index - 1], data[index]] = [data[index], data[index - 1]];

    const updatedOrder = data?.map((item, index) => {
      item.category_order = index + 1;
      return item;
    });

    setIsLoading(true);

    Promise.all([updateCategory(data[index]), updateCategory(data[index - 1])]);

    setIsLoading(false);

    setCategoryData(updatedOrder);
  };

  const handleMoveDown = (index) => {
    const data = cloneDeep(categoryData);

    [data[index], data[index + 1]] = [data[index + 1], data[index]];

    const updatedOrder = data?.map((item, index) => {
      item.category_order = index + 1;
      return item;
    });

    setIsLoading(true);

    Promise.all([updateCategory(data[index]), updateCategory(data[index + 1])]);

    setIsLoading(false);

    setCategoryData(updatedOrder);
  };

  const handleMoveUpSubCategory = async (index, subCategories) => {
    const data = cloneDeep(subCategories);

    [data[index - 1], data[index]] = [data[index], data[index - 1]];

    data?.map((item, index) => {
      item.sub_category_order = index + 1;
      return item;
    });

    await Promise.all([
      handleUpdateSubCategory(data[index]),
      handleUpdateSubCategory(data[index - 1]),
    ]);

    getCategoryData();
  };

  const handleMoveDownSubCategory = async (index, subCategories) => {
    const data = cloneDeep(subCategories);

    [data[index], data[index + 1]] = [data[index + 1], data[index]];

    data?.map((item, index) => {
      item.sub_category_order = index + 1;
      return item;
    });

    await Promise.all([
      handleUpdateSubCategory(data[index]),
      handleUpdateSubCategory(data[index + 1]),
    ]);

    getCategoryData();
  };

  return (
    <Container>
      {isLoading && <LoaderContainer />}

      <CommonWhiteBackground>
        <FlexBox className="mb-4">
          <div className="main-title ">{t("Categories")}</div>
          <FlexBox alignItems="flex-start">
            <InputComponent type="search" label={t("Search Orders")} />
            <ButtonComponent
              variant="contained"
              startIcon={<AddIcon />}
              text={t("Add Categories")}
              onClick={() => handleToggle()}
            />
          </FlexBox>
        </FlexBox>

        <Table aria-label="collapsible table" className="border-table">
          <TableHead>
            <TableRow>
              <TableCell width="5%">#</TableCell>
              <TableCell width="25%">{t("Image")}</TableCell>
              <TableCell width="30%">{t("Name")}</TableCell>
              <TableCell width="20%">{t("Status")}</TableCell>
              <TableCell width="20%">{t("Action")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryData &&
              categoryData.map((item, key) => (
                <>
                  <TableRow
                    sx={{ "& > *": { borderBottom: "unset" } }}
                    key={key}
                  >
                    <TableCell>
                      <span
                        onClick={() => handleCollSpanRow(item.id)}
                        className="cursor-pointer"
                      >
                        {item.id === activeOpenRow.id &&
                        activeOpenRow.isOpen ? (
                          <KeyboardArrowUpOutlinedIcon />
                        ) : (
                          <KeyboardArrowDownOutlinedIcon />
                        )}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="image-cover">
                        <img
                          src={`${REST_URL_SERVER}/images/${item.image_id}`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.active ? t("Active") : t("Inactive")}
                    </TableCell>
                    <TableCell>
                      <EditOutlinedIcon
                        onClick={() => handleEdit(item)}
                        className="cursor-pointer"
                      />
                      <DeleteOutlinedIcon
                        className="mx-2 cursor-pointer"
                        onClick={() => openToggleDeleteModel(item.id)}
                      />
                      {key !== 0 && (
                        <ArrowUp
                          onClick={() => handleMoveUp(key)}
                          className="cursor-pointer"
                        />
                      )}

                      {key !== categoryData?.length - 1 && (
                        <ArrowDown
                          onClick={() => handleMoveDown(key)}
                          className="cursor-pointer"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={
                          item.id === activeOpenRow.id && activeOpenRow.isOpen
                        }
                        timeout="auto"
                        unmountOnExit
                      >
                        <Table aria-label="collapsible table">
                          <TableHead>
                            <TableRow>
                              <TableCell width="5%">#</TableCell>
                              <TableCell width="25%">{t("Image")}</TableCell>
                              <TableCell width="30%">{t("Name")}</TableCell>
                              <TableCell width="20%">{t("Status")}</TableCell>
                              <TableCell width="20%">{t("Action")}</TableCell>
                            </TableRow>
                          </TableHead>
                          {item.sub_categories.length > 0 &&
                            item.sub_categories.map((sub_category, index) => (
                              <>
                                <TableRow
                                  sx={{
                                    "& > *": {
                                      borderBottom: "unset",
                                      background: "rgba(0, 0, 0, 0.03)",
                                    },
                                  }}
                                  key={index}
                                  className="sub-row-padding"
                                >
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                    <div className="image-cover ">
                                      <img
                                        src={`${REST_URL_SERVER}/images/${sub_category.image_id}`}
                                      />
                                    </div>
                                  </TableCell>
                                  <TableCell>{sub_category.name}</TableCell>
                                  <TableCell>
                                    {sub_category.active
                                      ? t("Active")
                                      : t("Inactive")}
                                  </TableCell>
                                  <TableCell>
                                    <EditOutlinedIcon
                                      onClick={() =>
                                        handleEdit(sub_category, true)
                                      }
                                      className="cursor-pointer"
                                    />
                                    <DeleteOutlinedIcon
                                      className="mx-2 cursor-pointer"
                                      onClick={() =>
                                        openToggleDeleteModel(
                                          sub_category.id,
                                          true
                                        )
                                      }
                                    />

                                    {index !== 0 && (
                                      <ArrowUp
                                        onClick={() =>
                                          handleMoveUpSubCategory(
                                            index,
                                            item?.sub_categories
                                          )
                                        }
                                        className="cursor-pointer"
                                      />
                                    )}

                                    {index !==
                                      item?.sub_categories?.length - 1 && (
                                      <ArrowDown
                                        onClick={() =>
                                          handleMoveDownSubCategory(
                                            index,
                                            item?.sub_categories
                                          )
                                        }
                                        className="cursor-pointer"
                                      />
                                    )}
                                  </TableCell>
                                </TableRow>
                              </>
                            ))}
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
        {isOpen && (
          <CategoriesForm
            refresh={getCategoryData}
            isOpen={isOpen}
            toggle={handleToggle}
            data={selectedItem}
            length={categoryData?.length}
          />
        )}
        <ModalComponent
          title={
            isSelectedSubCategory
              ? t("Delete Sub Category")
              : t("Delete Category")
          }
          size={"m"}
          open={isOpenDeleteModel}
          handleClose={handleToggleDeleteModel}
        >
          <p>{`${t("Are you sure you want to delete")}?`}</p>
          <>
            <FlexBox hasBorderTop={true} className="pt-3 mt-3">
              <ButtonComponent
                className=""
                variant="outlined"
                fullWidth
                text={t("Cancel")}
                onClick={handleToggleDeleteModel}
              />
              <ButtonComponent
                variant="contained"
                fullWidth
                text={
                  isSelectedSubCategory
                    ? t("Delete Sub Category")
                    : t("Delete Category")
                }
                type="button"
                onClick={() => {
                  handleDelete(selectedCategory, isSelectedSubCategory);
                }}
              />
            </FlexBox>
          </>
        </ModalComponent>
      </CommonWhiteBackground>
    </Container>
  );
};

export default Categories;
