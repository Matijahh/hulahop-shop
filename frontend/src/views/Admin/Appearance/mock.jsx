import { get } from "lodash";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { getImageUrlById } from "../../../utils/commonFunctions";

export const renderShopSliderHeader = [
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
    field: "image_id",
    headerName: "Slider Image",
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
    field: "description",
    headerName: "Slider description",
    width: 300,
    align: "left",
  },

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
    renderCell: ({ row }) => (
      <>
        <div className="d-flex align-items-center">
          <div
            role="button"
            className="me-2"
            onClick={() => row.handleEditShopSlider(row.id)}
          >
            <EditOutlinedIcon />
          </div>
          <div role="button" onClick={() => row.handleDeleteShopSlider(row.id)}>
            <DeleteOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];

export const renderAboutSliderHeader = [
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
    field: "image_id",
    headerName: "Slider Image",
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
    field: "description",
    headerName: "Slider description",
    width: 300,
    align: "left",
  },

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
    renderCell: ({ row }) => (
      <>
        <div className="d-flex align-items-center">
          <div
            role="button"
            className="me-2"
            onClick={() => row.handleEditAboutSlider(row.id)}
          >
            <EditOutlinedIcon />
          </div>
          <div
            role="button"
            onClick={() => row.handleDeleteAboutSlider(row.id)}
          >
            <DeleteOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];

export const renderBlogSliderHeader = [
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
    field: "image_id",
    headerName: "Slider Image",
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
    field: "description",
    headerName: "Slider description",
    width: 300,
    align: "left",
  },

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
    renderCell: ({ row }) => (
      <>
        <div className="d-flex align-items-center">
          <div
            role="button"
            className="me-2"
            onClick={() => row.handleEditBlogSlider(row.id)}
          >
            <EditOutlinedIcon />
          </div>
          <div role="button" onClick={() => row.handleDeleteBlogSlider(row.id)}>
            <DeleteOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];
