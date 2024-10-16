import {
  ROUTE_ASSOCIATE_MAIN,
  ROUTE_ASSOCIATE_MAIN_CATEGORIES,
  ROUTE_ASSOCIATE_MAIN_DASHBOARD,
  ROUTE_ASSOCIATE_MAIN_ORDERS,
  ROUTE_ASSOCIATE_MAIN_PRODUCTS,
  ROUTE_ASSOCIATE_MAIN_RETURN_PRODUCTS,
  ROUTE_ASSOCIATE_MAIN_SETTINGS,
  ROUTE_ASSOCIATE_CREATE_PRODUCT,
  ROUTE_ASSOCIATE_EDIT_PRODUCT,
  ROUTE_ASSOCIATE_REVIEWS,
  ROUTE_ASSOCIATE_ANNOUNCEMENTS,
  ROUTE_ASSOCIATE_WITHDRAWAL,
  ROUTE_ASSOCIATE_STORE_LAYOUT,
  ROUTE_ASSOCIATE_MAIN_ORDER_PREVIEW,
  ROUTE_ASSOCIATE_BLOG,
  ROUTE_ASSOCIATE_BLOG_ADD,
  ROUTE_ASSOCIATE_BLOG_EDIT,
} from "../routes";

import Dashboard from "../../Views/Associats/Dashboard";
import AssociatsLayout from "../../Layouts/AssociatsLayout";
import Products from "../../Views/Associats/Products";
import Orders from "../../Views/Associats/Orders";
import ReturnedProducts from "../../Views/Associats/Returned Products";
import Categories from "../../Views/Associats/Categories";
import Settings from "../../Views/Associats/Settings";
import CreateProduct from "../../Views/Associats/Products/CreateProduct";
import EditProduct from "../../Views/Associats/Products/EditProduct";
import Reviews from "../../Views/Associats/Reviews";
import Announcements from "../../Views/Associats/Announcements";
import Withdrawn from "../../Views/Associats/Withdrawn";
import StoreLayout from "../../Views/Associats/StoreLayout";
import OrderPreview from "../../Views/Associats/Orders/orderPreviewPage";
import AssociateBlog from "../../Views/Associats/Blog";
import AssociateBlogForm from "../../Views/Associats/Blog/BlogForm";

const routes = [
  {
    name: "Dashboard",
    path: ROUTE_ASSOCIATE_MAIN,
    component: (props) => (
      <AssociatsLayout {...props}>
        <Dashboard {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Dashboard",
    path: ROUTE_ASSOCIATE_MAIN_DASHBOARD,
    component: (props) => (
      <AssociatsLayout {...props}>
        <Dashboard {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Blog",
    path: ROUTE_ASSOCIATE_BLOG,
    component: (props) => (
      <AssociatsLayout {...props}>
        <AssociateBlog {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Add Blog",
    path: ROUTE_ASSOCIATE_BLOG_ADD,
    component: (props) => (
      <AssociatsLayout {...props}>
        <AssociateBlogForm {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Edit Blog",
    path: ROUTE_ASSOCIATE_BLOG_EDIT,
    component: (props) => (
      <AssociatsLayout {...props}>
        <AssociateBlogForm {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Products",
    path: ROUTE_ASSOCIATE_MAIN_PRODUCTS,
    component: (props) => (
      <AssociatsLayout {...props}>
        <Products {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Orders",
    path: ROUTE_ASSOCIATE_MAIN_ORDERS,
    component: (props) => (
      <AssociatsLayout {...props}>
        <Orders {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Orders",
    path: ROUTE_ASSOCIATE_MAIN_ORDER_PREVIEW,
    component: (props) => (
      <AssociatsLayout {...props}>
        <OrderPreview {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Returned Products",
    path: ROUTE_ASSOCIATE_MAIN_RETURN_PRODUCTS,
    component: (props) => (
      <AssociatsLayout {...props}>
        <ReturnedProducts {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Categories",
    path: ROUTE_ASSOCIATE_MAIN_CATEGORIES,
    component: (props) => (
      <AssociatsLayout {...props}>
        <Categories {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Settings",
    path: ROUTE_ASSOCIATE_MAIN_SETTINGS,
    component: (props) => (
      <AssociatsLayout {...props}>
        <Settings {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Create Product",
    path: ROUTE_ASSOCIATE_CREATE_PRODUCT,
    component: (props) => (
      <AssociatsLayout {...props}>
        <CreateProduct {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Edit Product",
    path: ROUTE_ASSOCIATE_EDIT_PRODUCT,
    component: (props) => (
      <AssociatsLayout {...props}>
        <EditProduct {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Reviews",
    path: ROUTE_ASSOCIATE_REVIEWS,
    component: (props) => (
      <AssociatsLayout {...props}>
        <Reviews {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Announcements",
    path: ROUTE_ASSOCIATE_ANNOUNCEMENTS,
    component: (props) => (
      <AssociatsLayout {...props}>
        <Announcements {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Withdrawn",
    path: ROUTE_ASSOCIATE_WITHDRAWAL,
    component: (props) => (
      <AssociatsLayout {...props}>
        <Withdrawn {...props} />
      </AssociatsLayout>
    ),
  },
  {
    name: "Store layout",
    path: ROUTE_ASSOCIATE_STORE_LAYOUT,
    component: (props) => (
      <AssociatsLayout {...props}>
        <StoreLayout {...props} />
      </AssociatsLayout>
    ),
  },
];

export default routes;
