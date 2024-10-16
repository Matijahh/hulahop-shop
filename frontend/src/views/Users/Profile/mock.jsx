import { get } from "lodash";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
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
    field: "product_image",
    headerName: "Product Image",
    width: 120,
    align: "left",
    renderCell: ({ row }) => (
      <>
        <img src={getImageUrlById(row.image)} />
        {/* <PreviewJsonImage
          previewImageUrl={getImageUrlById(row.image)}
          json={
            get(row, "orderDetail.associate_product.image_json.imageObj", "")
              ? JSON.parse(
                  get(
                    row,
                    "orderDetail.associate_product.image_json.imageObj",
                    ""
                  )
                )
              : null
          }
          maxHeight="120px"
          productData={get(row, "orderDetail.associate_product")}
        /> */}
      </>
    ),
    sortable: false,
  },

  {
    field: "id",
    headerName: "order Id",
    width: 180,
    align: "left",
  },
  {
    field: "date",
    headerName: "order Date",
    width: 180,
    align: "left",
  },
  {
    field: "price",
    headerName: "Order Total",
    width: 180,
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
        <VisibilityOutlinedIcon
          onClick={() => {
            row.openModel(row.orderDetail);
          }}
        />
      </>
    ),
  },
];
export const WishListHeader = [
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
    width: 120,
    align: "left",
    renderCell: ({ row }) => (
      <>
        <img src={getImageUrlById(row.image)} />
      </>
    ),
    sortable: false,
  },

  {
    field: "price",
    headerName: "Price",
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
        <div className="d-flex align-items-cente">
          <div
            role="button"
            className="me-2"
            onClick={() => row.ViewProduct(row.associate_product_id)}
          >
            <RemoveRedEyeOutlinedIcon />
          </div>
          <div role="button" onClick={() => row.handleDelete(row.id)}>
            <DeleteOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];
