import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { useNavigate } from "react-router";
import {
  ROUTE_ADMIN_ANNOUNCEMENTS,
  ROUTE_ADMIN_COLORS,
} from "../../../routes/routes";
import { get } from "lodash";
import SelectComponent from "../../../components/SelectComponent";

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
export const AnnouncementsFormWrapper = styled.div``;

const validation = Yup.object().shape({
  title: Yup.string().required("Title is required!"),
  description: Yup.string().required("Description is required!"),
});
const AnnouncementsForm = () => {
  const navigation = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "true,Active",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let id = get(params, "id");
      const URL = id ? `/announcements/${id}` : "/announcements";
      const reqBody = {
        title: values.title,
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
      navigation(ROUTE_ADMIN_ANNOUNCEMENTS);
    },
  });

  const getAnnouncementsData = async () => {
    setLoading(true);

    let id = get(params, "id");
    const response = await commonGetQuery(`/announcements/${id}`);
    if (response) {
      const { data } = response.data;
      const { title, description, status } = data;
      formik.setFieldValue("title", title);
      formik.setFieldValue("description", description);
      formik.setFieldValue("status", status ? "true,Active" : "false,Inactive");
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    let id = get(params, "id");
    if (id) {
      getAnnouncementsData();
    }
  }, []);

  return (
    <AnnouncementsFormWrapper>
      <CommonWhiteBackground>
        <FlexBox>
          <div className="main-title ">Announcements</div>
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
                  <InputComponent
                    InnerPlaceholder="Enter title"
                    name="title"
                    fullWidth
                    label="Title"
                    formik={formik}
                    disabled={loading}
                  />
                </div>
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
          </form>
        </div>
      </CommonWhiteBackground>
    </AnnouncementsFormWrapper>
  );
};
export default AnnouncementsForm;
