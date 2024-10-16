import { get } from "lodash";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button } from "@mui/material";
export const renderHeader = (
  toggleModal,
  handleOpenToggle,
  handleSendPasswordForgetLink
) => {
  return [
    {
      field: "no",
      headerName: "No.",
      width: 50,
      align: "left",
      sortable: false,
      renderCell: (params) => (
        <>
          <span className="mx-2">{get(params, "row.no")}</span>
        </>
      ),
    },
    {
      field: "user_image",
      headerName: "User Image",
      width: 120,
      align: "left",
      renderCell: (params) => (
        <>
          <img src={get(params, "row.user_image")} />
        </>
      ),
      sortable: false,
    },
    {
      field: "user_name",
      headerName: "User Name",
      width: 180,
      align: "left",
    },
    {
      field: "user_type",
      headerName: "User type",
      width: 180,
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      align: "left",
    },
    {
      field: "contact_no",
      headerName: "Contact No",
      width: 180,
      align: "left",
    },
    // {
    //   field: "address",
    //   headerName: "Address",
    //   width: 300,
    //   align: "left",
    // },

    {
      field: "status",
      headerName: "Status",
      width: 180,
      align: "left",
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      align: "left",
      renderCell: (params) => (
        <>
          <EditOutlinedIcon
            className=" cursor-pointer"
            onClick={() => toggleModal(params)}
          />
          <DeleteOutlineOutlinedIcon
            className="mx-2 cursor-pointer"
            onClick={() => handleOpenToggle(params?.row?.id)}
          />
        </>
      ),
    },
    {
      field: "password reset link",
      headerName: "Password Reset Link",
      width: 200,
      align: "left",
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleSendPasswordForgetLink(params?.row?.email)}
          >
            Send
          </Button>
        </>
      ),
    },
  ];
};
