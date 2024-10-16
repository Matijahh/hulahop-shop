import GridViewIcon from "@mui/icons-material/GridView";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NextWeekOutlinedIcon from "@mui/icons-material/NextWeekOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CampaignIcon from "@mui/icons-material/Campaign";
import ReviewsIcon from "@mui/icons-material/Reviews";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import {
  ROUTE_ADMIN_BLOG,
  ROUTE_ASSOCIATE_ANNOUNCEMENTS,
  ROUTE_ASSOCIATE_BLOG,
  ROUTE_ASSOCIATE_MAIN_DASHBOARD,
  ROUTE_ASSOCIATE_MAIN_ORDERS,
  ROUTE_ASSOCIATE_MAIN_PRODUCTS,
  ROUTE_ASSOCIATE_MAIN_RETURN_PRODUCTS,
  ROUTE_ASSOCIATE_MAIN_SETTINGS,
  ROUTE_ASSOCIATE_REVIEWS,
  ROUTE_ASSOCIATE_STORE_LAYOUT,
  ROUTE_ASSOCIATE_WITHDRAWAL,
} from "../../../routes/routes";

export const SidebarTabList = [
  {
    icon: <GridViewIcon />,
    name: "Dashboard",
    path: ROUTE_ASSOCIATE_MAIN_DASHBOARD,
  },
  {
    icon: <ShoppingBagOutlinedIcon />,
    name: "products",
    path: ROUTE_ASSOCIATE_MAIN_PRODUCTS,
  },
  {
    icon: <ShoppingCartOutlinedIcon />,
    name: "orders",
    path: ROUTE_ASSOCIATE_MAIN_ORDERS,
  },
  // {
  //   icon: <NextWeekOutlinedIcon />,
  //   name: "returned products",
  //   path: ROUTE_ASSOCIATE_MAIN_RETURN_PRODUCTS,
  // },

  {
    icon: <SettingsOutlinedIcon />,
    name: "settings",
    path: ROUTE_ASSOCIATE_MAIN_SETTINGS,
  },
  // {
  //   icon: <ReviewsIcon />,
  //   name: "Reviews",
  //   path: ROUTE_ASSOCIATE_REVIEWS,
  // },
  {
    icon: <AccountBalanceWalletOutlinedIcon />,
    name: "Withdrawn",
    path: ROUTE_ASSOCIATE_WITHDRAWAL,
  },
  {
    icon: <CampaignIcon />,
    name: "Announcement",
    path: ROUTE_ASSOCIATE_ANNOUNCEMENTS,
  },
  {
    icon: <ArticleOutlinedIcon />,
    name: "Blog",
    path: ROUTE_ASSOCIATE_BLOG,
  },
  {
    icon: <EditOutlinedIcon />,
    name: "Store Layout",
    path: ROUTE_ASSOCIATE_STORE_LAYOUT,
  },
  {
    icon: <LogoutIcon />,
    name: "Logout",
    path: "#",
  },
];
