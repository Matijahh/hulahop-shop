import React, { useEffect, useState } from "react";
import ModalComponent from "../../../components/ModalComponent";
import { useFormik } from "formik";
import SelectComponent from "../../../components/SelectComponent";
import { commonAddUpdateQuery } from "../../../utils/axiosInstance";
import { SuccessTaster } from "../../../components/Toast";
import { FlexBox } from "../../../components/Sections";
import ButtonComponent from "../../../components/ButtonComponent";

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

const UpdateUserStatus = ({ isOpen, toggle, refresh, data }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      formik.setValues({
        ...formik.values,
        id: data.row.id,
        status: `${
          data.row.status === "Active" ? "true,Active" : "false,Inactive"
        }`,
      });
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      id: null,
      status: `true,Active`,
    },
    onSubmit: async (values) => {
      setLoading(true);
      const requiredBody = {
        status: values.status.split(",")[0] == "true" ? true : false,
      };
      const response = await commonAddUpdateQuery(
        `/users/${values.id}`,
        requiredBody,
        "PATCH"
      );
      setLoading(false);
      if (response) {
        const { message } = response.data;
        SuccessTaster(message);
        refresh();
        toggle();
      }
    },
  });

  return (
    <ModalComponent
      title="Update User Status"
      size={"m"}
      open={isOpen}
      handleClose={toggle}
    >
      <form onSubmit={formik.handleSubmit}>
        <SelectComponent
          fullWidth
          optionList={optionList}
          name="status"
          formik={formik}
          title="Select Status"
          disabled={loading}
        />
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
            text="Change Status"
            type="submit"
            loading={loading}
          />
        </FlexBox>
      </form>
    </ModalComponent>
  );
};

export default UpdateUserStatus;
