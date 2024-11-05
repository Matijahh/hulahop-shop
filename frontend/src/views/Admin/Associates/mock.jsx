import { get } from "lodash";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Switch } from "@mui/material";

export const renderHeader = (toggleModal, deleteItem, onCheck) => {
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
      align: "center",
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
      headerName: "User Type",
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

    {
      field: "status",
      headerName: "Status",
      width: 150,
      align: "center",
    },

    {
      field: "isHighlighted",
      headerName: "Highlighted",
      width: 100,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <Switch
              checked={params.row.isHighlighted}
              onChange={(e, checked) => onCheck(checked, params.row.id)}
            />
          </>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 100,
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <>
          <RemoveRedEyeOutlinedIcon
            className="cursor-pointer"
            onClick={() => toggleModal(params)}
          />
          <DeleteOutlineOutlinedIcon
            className="mx-2 cursor-pointer"
            onClick={() => deleteItem(params.row)}
          />
        </>
      ),
    },
  ];
};
