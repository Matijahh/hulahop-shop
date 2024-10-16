import React, { useEffect, useState } from "react";
import Tables from "../../../components/SuperAdmin/Tables";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import InputComponent from "../../../components/InputComponent";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { Loader, LoaderContainer } from "../../../components/Loader";
import AddIcon from "@mui/icons-material/Add";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  ROUTE_ADMIN_ANNOUNCEMENTS_ADD,
  ROUTE_ADMIN_ANNOUNCEMENTS_EDIT,
} from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../../components/ButtonComponent";

const Announcements = () => {
  const tableHeaderTitle = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Title", width: 200 },
    { field: "desc", headerName: "Details", width: 700 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      align: "left",
      renderCell: ({ row }) => (
        <>
          <div className="d-flex align-items-cente">
            <div
              role="button"
              className="me-2"
              onClick={() => row.EditColor(row.id)}
            >
              <EditOutlinedIcon />
            </div>
            <div role="button" onClick={() => row.handleDelete(row.id)}>
              <DeleteOutlinedIcon />
            </div>
          </div>
        </>
      ),
    },
  ];

  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);
  const [tableList, setTableList] = useState([]);

  const getAnnouncementDat = async () => {
    setLoading(true);
    const response = await commonGetQuery("/announcements");
    setLoading(false);
    if (response) {
      const { data } = response.data;
      const modifiedData = data.map((item) => {
        return {
          id: item.id,
          title: item.title,
          desc: item.description,
          handleDelete,
          EditColor,
        };
      });
      setTableList(modifiedData);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await commonAddUpdateQuery(
      `/announcements/${id}`,
      null,
      "DELETE"
    );
    if (response) {
      getAnnouncementDat();
    }
    setLoading(false);
  };

  const EditColor = (id) => {
    let route = ROUTE_ADMIN_ANNOUNCEMENTS_EDIT.replace(":id", id);
    navigation(route);
  };

  useEffect(() => {
    getAnnouncementDat();
  }, []);

  return (
    <CommonWhiteBackground>
      <FlexBox className="mb-4">
        <div className="main-title ">Announcements</div>
        <FlexBox>
          {/* <InputComponent type="search" label="Search orders" /> */}
          <ButtonComponent
            variant="contained"
            startIcon={<AddIcon />}
            text="Add Announcements"
            onClick={() => navigation(ROUTE_ADMIN_ANNOUNCEMENTS_ADD)}
          />
        </FlexBox>
      </FlexBox>
      {loading && <LoaderContainer />}
      <Tables header={tableHeaderTitle} body={tableList} />
    </CommonWhiteBackground>
  );
};
export default Announcements;
