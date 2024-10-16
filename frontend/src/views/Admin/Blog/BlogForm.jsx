import React, { useEffect, useState } from "react";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import ReactQuillEditor from "../../../components/ReactQuillEditor";
import styled from "styled-components";
import InputComponent from "../../../components/InputComponent";
import ImageUploadBox from "../../../components/ImageUploadBox";
import ButtonComponent from "../../../components/ButtonComponent";
import { ROUTE_ADMIN_BLOG } from "../../../routes/routes";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { get } from "lodash";

const BlogFormWrapper = styled.div``;
const validation = Yup.object().shape({
  heading: Yup.string().required("Heading is required!"),
  content: Yup.string().required("Content is required!"),
});
const BlogForm = () => {
  const navigation = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState();

  const formik = useFormik({
    initialValues: {
      image_id: "",
      heading: "",
      category_name: "",
      content: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let id = get(params, "id");
      const URL = id ? `/blogs/${id}` : "/blogs";
      const reqBody = {
        heading: values.heading,
        category_name: values.category_name,
        content: values.content,
        image_id: values.image_id,
      };
      setLoading(true);
      const response = await commonAddUpdateQuery(
        URL,
        reqBody,
        id ? "PATCH" : "POST"
      );
      setLoading(false);
      navigation(ROUTE_ADMIN_BLOG);
    },
  });

  const handleChangeTextArea = (name, value) => {
    formik.setFieldValue(name, value);
  };

  const getBlogData = async () => {
    setLoading(true);

    let id = get(params, "id");
    const response = await commonGetQuery(`/blogs/${id}`);
    if (response) {
      const { data } = response.data;
      const { image_id, heading, category_name, content } = data;
      formik.setFieldValue("image_id", image_id);
      formik.setFieldValue("heading", heading);
      formik.setFieldValue("category_name", category_name);
      formik.setFieldValue("content", content);
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    let id = get(params, "id");
    if (id) {
      getBlogData();
    }
  }, []);

  return (
    <BlogFormWrapper>
      <CommonWhiteBackground>
        <FlexBox>
          <div className="main-title ">Add Blog</div>
        </FlexBox>
        <hr />
        <div className="commomn-form-wrapper">
          <form
            action=""
            className="commomn-form"
            onSubmit={formik.handleSubmit}
          >
            <div className="container-fluid">
              <div className="row g-4">
                <div className="col-lg-12">
                  <ImageUploadBox
                    name="image_id"
                    id={formik.values.image_id}
                    formik={formik}
                  />
                </div>
                {/* <div className="col-lg-7">
                  <div className="row g-4"> */}
                <div className="col-lg-12">
                  <InputComponent
                    name="heading"
                    InnerPlaceholder="Blog Heading"
                    fullWidth
                    label="Blog Heading *"
                    formik={formik}
                    disabled={loading}
                  />
                </div>
                <div className="col-lg-12">
                  <InputComponent
                    name="category_name"
                    InnerPlaceholder="Blog Category"
                    fullWidth
                    formik={formik}
                    disabled={loading}
                    label="Blog Category"
                  />
                </div>
                <div className="col-lg-12">
                  <ReactQuillEditor
                    handleChange={(e) => handleChangeTextArea("content", e)}
                    name="content"
                    value={formik.values.content}
                    label="Blog Content"
                  />
                </div>
                <div className="col-12">
                  <FlexBox justifyContent="end" className="mt-3">
                    <ButtonComponent
                      variant="contained"
                      text="Save"
                      type="submit"
                      disabled={loading}
                      // onClick={() => navigation(ROUTE_ADMIN_PRODUCTS_ADD)}
                    />
                  </FlexBox>
                </div>
              </div>
            </div>
          </form>
        </div>
      </CommonWhiteBackground>
    </BlogFormWrapper>
  );
};

export default BlogForm;
