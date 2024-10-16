import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { ErrorMessage, useFormik } from "formik";
import { useParams } from "react-router-dom";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import SelectComponent from "../../../components/SelectComponent";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { useNavigate } from "react-router";
import { get } from "lodash";
import ImageUploadBox from "../../../components/ImageUploadBox";
import { ROUTE_ADMIN_APPEARANCE } from "../../../routes/routes";

const StatusList = [
  {
    id: true,
    title: "Active",
  },
  {
    id: false,
    title: "Inactive",
  },
];
export const ColorsFormWrapper = styled.div``;

const validation = Yup.object().shape({
  image_id: Yup.string().required("Image is required!"),
  description: Yup.string().required("Description  is required!"),
});

const ShopSliderForm = () => {
  const navigation = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState();

  const formik = useFormik({
    initialValues: {
      image_id: "",
      description: "",
      status: "true,Active",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let id = get(params, "id");
      const URL = id ? `/shop_slider/${id}` : "/shop_slider";
      const reqBody = {
        image_id: values.image_id,
        description: values.description,
        status: values.status.split(",")[0] === "true" ? true : false,
      };
      setLoading(true);
      const response = await commonAddUpdateQuery(
        URL,
        reqBody,
        id ? "PATCH" : "POST"
      );
      setLoading(false);
      navigation(ROUTE_ADMIN_APPEARANCE);
    },
  });

  const getShhopSlider = async () => {
    setLoading(true);

    let id = get(params, "id");
    const response = await commonGetQuery(`/shop_slider/${id}`);
    if (response) {
      const { data } = response.data;
      const { image_id, description, status } = data;
      formik.setFieldValue("image_id", image_id);
      formik.setFieldValue("description", description);
      formik.setFieldValue("status", status ? "true,Active" : "false,Inactive");
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    let id = get(params, "id");
    if (id) {
      getShhopSlider();
    }
  }, []);

  return (
    <ColorsFormWrapper>
      <CommonWhiteBackground>
        <FlexBox>
          <div className="main-title ">Add Shop Slider Slides</div>
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
                <div className="col-lg-5">
                  <ImageUploadBox
                    name="image_id"
                    id={formik.values.image_id}
                    formik={formik}
                  />
                  {formik &&
                    formik.touched["image_id"] &&
                    formik.errors["image_id"] && (
                      <p className="input-error">
                        {formik &&
                          formik.touched["image_id"] &&
                          formik.errors["image_id"]}
                      </p>
                    )}
                </div>
                <div className="col-lg-7">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <InputComponent
                        InnerPlaceholder="Write description"
                        fullWidth
                        name="description"
                        label="Description"
                        type="textarea"
                        formik={formik}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-lg-12">
                      <SelectComponent
                        // label="Status"
                        fullWidth
                        name="status"
                        optionList={StatusList}
                        formik={formik}
                        title="Select Status"
                        disabled={loading}
                      />
                    </div>
                    <div className="col-12">
                      <FlexBox justifyContent="end" className="mt-3">
                        <ButtonComponent
                          variant="contained"
                          text="Save"
                          type="submit"
                          // onClick={() => navigation(ROUTE_ADMIN_PRODUCTS_ADD)}
                        />
                      </FlexBox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </CommonWhiteBackground>
    </ColorsFormWrapper>
  );
};

export default ShopSliderForm;
