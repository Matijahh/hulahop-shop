import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalComponent from "../../../components/ModalComponent";
import InputComponent from "../../../components/InputComponent";
import SelectComponent from "../../../components/SelectComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { FlexBox } from "../../../components/Sections";
import { Modal } from "react-bootstrap";
import BoxFileInput from "../../../components/BoxFileInput";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import axios from "axios";
import { ACCESS_TOKEN, REST_URL_SERVER } from "../../../Utils/constant";
import { ErrorTaster } from "../../../components/Toast";

const optionList = [
  {
    id: true,
    title: "Active",
  },
  {
    id: false,
    title: "Inactive",
  },
];

const validation = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
});

const CategoriesForm = ({ isOpen, toggle, refresh, data, length }) => {
  const [parentCategoryList, setParentCategoryList] = useState([
    { id: 0, title: "Select Parent Category" },
  ]);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: null,
      parentCategory: "0,Select Parent Category",
      name: "",
      active: "true,Active",
      previewURL: null,
      imageObj: null,
      imageId: null,
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let reqBody = {
        name: values.name,
        active: values.active.split(",")[0] === "true" ? true : false,
        image_id: values.imageId,
        category_order: length + 1,
      };
      if (values.parentCategory.split(",")[0] !== "0") {
        reqBody.category_id = parseInt(values.parentCategory.split(",")[0]);
        reqBody.sub_category_order = subCategories.length + 1;
      }
      const URL =
        values.parentCategory.split(",")[0] !== "0"
          ? values.id
            ? `/sub_categories/${values.id}`
            : "/sub_categories"
          : values.id
          ? `/categories/${values.id}`
          : "/categories";
      setLoading(true);
      const response = await commonAddUpdateQuery(
        URL,
        reqBody,
        values.id ? "PATCH" : "POST"
      );
      setLoading(false);
      if (response) {
        toggle();
        refresh();
        formik.resetForm();
      }
    },
  });

  const categoryId = formik.values.parentCategory?.split(",")[0];

  const uploadImage = async (file) => {
    try {
      let formData = new FormData();
      formData.append("image", file);
      setFileLoading(true);
      const response = await axios.post(
        `${REST_URL_SERVER}/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setFileLoading(false);
      if (response.status === 200) {
        const { data } = response.data;
        formik.setFieldValue("imageId", data.id);
      }
    } catch (error) {
      setFileLoading(false);
      if (error && error.data) {
        const { message } = error.data;
        return ErrorTaster(message);
      }
    }
  };

  const onFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const getParentCategory = async () => {
    const EditedCategory = data;
    const response = await commonGetQuery("/categories");
    if (response) {
      const { data } = response.data;
      const updatedList =
        data &&
        data.map((item) => {
          return { id: item.id, title: item.name };
        });
      if (EditedCategory) {
        const FindCategoryObj = updatedList.find(
          (item) => item.id === EditedCategory.category_id
        );
        if (FindCategoryObj && EditedCategory.isSubCategory) {
          formik.setFieldValue(
            "parentCategory",
            `${FindCategoryObj.id},${FindCategoryObj.title}`
          );
        }
      }
      setParentCategoryList([parentCategoryList[0], ...updatedList] || []);
    }
  };

  const onDeselect = () => {
    formik.setFieldValue("previewURL", null);
  };

  const getSubCategoriesByCategoryId = async () => {
    const response = await commonGetQuery(
      `/sub_categories/category/${categoryId}`
    );
    setSubCategories(response?.data?.data ?? []);
  };

  useEffect(() => {
    getParentCategory();
  }, []);

  useEffect(() => {
    if (Number(categoryId > 0)) {
      getSubCategoriesByCategoryId();
    }
  }, [categoryId]);

  useEffect(() => {
    if (data) {
      formik.setValues({
        ...formik.values,
        id: data.id,
        parentCategory: "0,Select Parent Category",
        name: data.name,
        active: data.active ? "true,Active" : "false,Inactive",
        imageId: data.image_id,
      });
    } else {
      formik.resetForm();
    }
  }, [data]);

  return (
    <ModalComponent
      title="Add Category"
      size={"m"}
      open={isOpen}
      handleClose={toggle}
    >
      <form onSubmit={formik.handleSubmit}>
        <SelectComponent
          fullWidth
          optionList={parentCategoryList}
          name="parentCategory"
          formik={formik}
          title="Select Parent Category"
          disabled={loading}
        />
        <InputComponent
          label="Category Name"
          fullWidth
          InnerPlaceholder="Enter Category Name"
          name="name"
          formik={formik}
          className="mt-3"
          disabled={loading}
        />
        <SelectComponent
          fullWidth
          optionList={optionList}
          name="active"
          formik={formik}
          title="Status"
          className="mt-2"
          disabled={loading}
        />

        <div className="mt-3">
          <BoxFileInput
            previewURL={
              formik.values.imageId &&
              `${REST_URL_SERVER}/images/${formik.values.imageId}`
            }
            onFileSelect={onFileSelect}
            onCancel={onDeselect}
            type="image/*"
            loading={fileLoading}
            disabled={loading}
          />
        </div>

        <>
          <FlexBox hasBorderTop={true} className="pt-3 mt-3">
            <ButtonComponent
              className=""
              variant="outlined"
              fullWidth
              text="Cancel"
              onClick={toggle}
            />
            <ButtonComponent
              variant="contained"
              fullWidth
              text="Add Categories"
              type="submit"
              loading={loading}
            />
          </FlexBox>
        </>
      </form>
    </ModalComponent>
  );
};

export default CategoriesForm;
