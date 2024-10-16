import { get } from "lodash";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
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
