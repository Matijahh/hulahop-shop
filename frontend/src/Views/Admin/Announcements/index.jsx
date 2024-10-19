import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import {
  ROUTE_ADMIN_ANNOUNCEMENTS_ADD,
  ROUTE_ADMIN_ANNOUNCEMENTS_EDIT,
} from "../../../routes/routes";

import Tables from "../../../components/SuperAdmin/Tables";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ButtonComponent from "../../../components/ButtonComponent";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";

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

  const [loading, setLoading] = useState(false);
  const [tableList, setTableList] = useState([]);

  const navigation = useNavigate();
  const { t } = useTranslation();

  const getAnnouncementData = async () => {
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
      getAnnouncementData();
    }

    setLoading(false);
  };

  const EditColor = (id) => {
    let route = ROUTE_ADMIN_ANNOUNCEMENTS_EDIT.replace(":id", id);
    navigation(route);
  };

  useEffect(() => {
    getAnnouncementData();
  }, []);

  return (
    <CommonWhiteBackground>
      <FlexBox className="mb-4">
        <div className="main-title ">{t("Announcements")}</div>
        <FlexBox>
          <ButtonComponent
            variant="contained"
            startIcon={<AddIcon />}
            text={t("Add Announcements")}
            onClick={() => navigation(ROUTE_ADMIN_ANNOUNCEMENTS_ADD)}
          />
        </FlexBox>
      </FlexBox>
      {loading && <LoaderContainer />}
      <Tables
        header={tableHeaderTitle.map((item) => ({
          ...item,
          headerName: t(item.headerName),
        }))}
        body={tableList}
      />
    </CommonWhiteBackground>
  );
};
export default Announcements;
