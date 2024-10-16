import { get } from "lodash";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { getImageUrlById } from "../../../utils/commonFunctions";
export const renderHeader = [
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
    field: "blog_img",
    headerName: "Cover Image",
    width: 120,
    align: "left",
    renderCell: (params) => (
      <>
        <img src={getImageUrlById(get(params, "row.image_id"))} />
      </>
    ),
    sortable: false,
  },
  {
    field: "heading",
    headerName: "Blog  Heading",
    width: 300,
    align: "left",
  },
  {
    field: "category_name",
    headerName: "Category",
    width: 180,
    align: "left",
  },

  // {
  //   field: "post_date",
  //   headerName: "Post Date",
  //   width: 180,
  //   align: "left",
  // },

  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 180,
  //   align: "left",
  // },

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
