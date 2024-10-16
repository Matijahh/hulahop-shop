import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useFormik } from "formik";
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
import { ROUTE_ADMIN_COLORS } from "../../../routes/routes";
import { get } from "lodash";

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
  code: Yup.string().required("Code is required!"),
  name: Yup.string().required("name is required!"),
});

const ColorsForm = () => {
  const navigation = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState();

  const formik = useFormik({
    initialValues: {
      code: "#000000",
      name: "",
      status: "true,Active",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let id = get(params, "id");
      const URL = id ? `/colors/${id}` : "/colors";
      const reqBody = {
        name: values.name,
        code: values?.code,
        status: values.status.split(",")[0] === "true" ? true : false,
      };
      setLoading(true);
      const response = await commonAddUpdateQuery(
        URL,
        reqBody,
        id ? "PATCH" : "POST"
      );
      setLoading(false);
      navigation(ROUTE_ADMIN_COLORS);
    },
  });

  const getColorData = async () => {
    setLoading(true);

    let id = get(params, "id");
    const response = await commonGetQuery(`/colors/${id}`);
    if (response) {
      const { data } = response.data;
      const { code, name, status } = data;
      formik.setFieldValue("code", code);
      formik.setFieldValue("name", name);
      formik.setFieldValue("status", status ? "true,Active" : "false,Inactive");
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    let id = get(params, "id");
    if (id) {
      getColorData();
    }
  }, []);

  return (
    <ColorsFormWrapper>
      <CommonWhiteBackground>
        <FlexBox>
          <div className="main-title ">Add Color</div>
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
                <div className="col-lg-2">
                  <InputComponent
                    name="code"
                    fullWidth
                    label="Select Color"
                    type="color"
                    formik={formik}
                    disabled={loading}
                  />
                </div>
                <div className="col-lg-5">
                  <InputComponent
                    name="name"
                    InnerPlaceholder="Color name"
                    fullWidth
                    label="Color name"
                    formik={formik}
                    disabled={loading}
                  />
                </div>
                <div className="col-lg-5">
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
          </form>
        </div>
      </CommonWhiteBackground>
    </ColorsFormWrapper>
  );
};

export default ColorsForm;
