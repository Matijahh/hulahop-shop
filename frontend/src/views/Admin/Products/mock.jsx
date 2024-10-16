import { get } from "lodash";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { getImageUrlById } from "../../../utils/commonFunctions";
import PreviewJsonImage from "../../../components/PreviewJsonImage";
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
    field: "product_image",
    headerName: "Product Image",
    width: 200,
    align: "left",
    renderCell: (params) => {
      return (
        <div style={{ width: 200, height: "auto" }}>
          {/* <img src={getImageUrlById(get(params, "row.product_image"))} /> */}
          <PreviewJsonImage
            previewImageUrl={getImageUrlById(get(params, "row.product_image"))}
            productData={{
              product: {
                x_position: params.row.x_position,
                y_position: params.row.y_position,
                frame_width: params.row.frame_width,
                frame_height: params.row.frame_height,
              },
            }}
          />
        </div>
      );
    },

    sortable: false,
  },
  {
    field: "product_description",
    headerName: "Product description",
    width: 300,
    align: "left",
  },
  // {
  //   field: "category",
  //   headerName: "Category",
  //   width: 180,
  //   align: "left",
  // },
  // {
  //   field: "sub_category",
  //   headerName: "Sub Category",
  //   width: 180,
  //   align: "left",
  // },
  // {
  //   field: "colors",
  //   headerName: "Colors",
  //   width: 180,
  //   align: "left",
  // },
  {
    field: "price",
    headerName: "Price",
    width: 180,
    align: "left",
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 180,
  //   align: "left",
  // },
  // {
  //   field: "qty",
  //   headerName: "Quantity",
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
            onClick={() => row.EditProduct(row.id)}
          >
            <EditOutlinedIcon />
          </div>
          <div role="button" onClick={() => row.handleOpenToggle(row.id)}>
            <DeleteOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];
