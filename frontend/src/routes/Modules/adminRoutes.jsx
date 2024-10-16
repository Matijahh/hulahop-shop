import {
  ROUTE_ADMIN,
  ROUTE_ADMIN_APPEARANCE,
  ROUTE_ADMIN_ASSOCIATES,
  ROUTE_ADMIN_BLOG,
  ROUTE_ADMIN_CATEGORIES,
  ROUTE_ADMIN_COLORS,
  ROUTE_ADMIN_CONTACT,
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ADMIN_ORDERS,
  ROUTE_ADMIN_PRODUCTS,
  ROUTE_ADMIN_REVIEWS,
  ROUTE_ADMIN_RETURNED_PRODUCTS,
  ROUTE_ADMIN_USERS,
  ROUTE_ADMIN_WITHDRAWN,
  ROUTE_ADMIN_PRODUCTS_ADD,
  ROUTE_ADMIN_ASSOCIATE_PRODUCTS,
  ROUTE_ADMIN_SIGN_IN,
  ROUTE_ADMIN_CATEGORIES_ADD,
  ROUTE_ADMIN_COLORS_ADD,
  ROUTE_ADMIN_COLORS_EDIT,
  ROUTE_ADMIN_ABOUT_PRODUCT,
  ROUTE_ADMIN_ABOUT_PRODUCT_ADD,
  ROUTE_ADMIN_BLOG_ADD,
  ROUTE_ADMIN_BLOG_EDIT,
  ROUTE_ADMIN_PRODUCTS_EDIT,
  ROUTE_ADMIN_ANNOUNCEMENTS,
  ROUTE_ADMIN_ANNOUNCEMENTS_ADD,
  ROUTE_ADMIN_ANNOUNCEMENTS_EDIT,
  ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_ADD,
  ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_EDIT,
  ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_ADD,
  ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_EDIT,
  ROUTE_ADMIN_ABOUT_PRODUCT_EDIT,
  ROUTE_ADMIN_ASSOCIATE_VIEW_PRODUCTS,
  ROUTE_ADMIN_ASSOCIATE_EDIT_PRODUCTS,
  ROUTE_ADMIN_TRANSLATION,
  ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_ADD,
  ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_EDIT,
} from "../routes";

import AdminLayout from "../../Layouts/AdminLayout";
import SignIn from "../../Views/Admin/Authentication/signIn";

import Appearance from "../../Views/Admin/Appearance";
import ShopSliderForm from "../../Views/Admin/Appearance/ShopSliderForm";
import AboutSliderForm from "../../Views/Admin/Appearance/AboutSliderForm";

import Associates from "../../Views/Admin/Associates";

import Blog from "../../Views/Admin/Blog";
import BlogForm from "../../Views/Admin/Blog/BlogForm";

import Categories from "../../Views/Admin/Categories";
import CategoriesForm from "../../Views/Admin/Categories/CategoriesForm";

import Colors from "../../Views/Admin/Colors";
import ColorsForm from "../../Views/Admin/Colors/ColorsForm";

import Contact from "../../Views/Admin/Contact";
import Dashboard from "../../Views/Admin/Dashboard";
import Orders from "../../Views/Admin/Orders";

import Products from "../../Views/Admin/Products";
import ProductForm from "../../Views/Admin/Products/ProductForm";

import AssociateProducts from "../../Views/Admin/AssociatesProducts";
import ViewProduct from "../../Views/Admin/AssociatesProducts/ViewProduct";

import Reviews from "../../Views/Admin/Reviews";
import RreturnedProducts from "../../Views/Admin/RreturnedProducts";
import Users from "../../Views/Admin/Users";
import Withdrawn from "../../Views/Admin/Withdrawn";

import AboutProduct from "../../Views/Admin/AboutProduct";
import AboutProductForm from "../../Views/Admin/AboutProduct/AboutProductForm";

import Announcements from "../../Views/Admin/Announcements";
import AnnouncementsForm from "../../Views/Admin/Announcements/AnnouncementsForm";
import Translation from "../../Views/Admin/Translation";
import EditProduct from "../../Views/Admin/AssociatesProducts/EditProduct";
import BlogSliderForm from "../../Views/Admin/Appearance/BlogSliderForm";
const routes = [
  {
    name: "Dashboard",
    path: ROUTE_ADMIN,
    component: (props) => (
      <AdminLayout {...props}>
        <Dashboard {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Dashboard",
    path: ROUTE_ADMIN_DASHBOARD,
    component: (props) => (
      <AdminLayout {...props}>
        <Dashboard {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Products",
    path: ROUTE_ADMIN_PRODUCTS,
    component: (props) => (
      <AdminLayout {...props}>
        <Products {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Add Products",
    path: ROUTE_ADMIN_PRODUCTS_ADD,
    component: (props) => (
      <AdminLayout {...props}>
        <ProductForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Edit Products",
    path: ROUTE_ADMIN_PRODUCTS_EDIT,
    component: (props) => (
      <AdminLayout {...props}>
        <ProductForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Associate Products",
    path: ROUTE_ADMIN_ASSOCIATE_PRODUCTS,
    component: (props) => (
      <AdminLayout {...props}>
        <AssociateProducts {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "View Associate Products",
    path: ROUTE_ADMIN_ASSOCIATE_VIEW_PRODUCTS,
    component: (props) => (
      <AdminLayout {...props}>
        <ViewProduct {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Edit Associate Products",
    path: ROUTE_ADMIN_ASSOCIATE_EDIT_PRODUCTS,
    component: (props) => (
      <AdminLayout {...props}>
        <EditProduct {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Orders",
    path: ROUTE_ADMIN_ORDERS,
    component: (props) => (
      <AdminLayout {...props}>
        <Orders {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Users",
    path: ROUTE_ADMIN_USERS,
    component: (props) => (
      <AdminLayout {...props}>
        <Users {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Returned Products",
    path: ROUTE_ADMIN_RETURNED_PRODUCTS,
    component: (props) => (
      <AdminLayout {...props}>
        <RreturnedProducts {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Categories",
    path: ROUTE_ADMIN_CATEGORIES,
    component: (props) => (
      <AdminLayout {...props}>
        <Categories {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Add Categories",
    path: ROUTE_ADMIN_CATEGORIES_ADD,
    component: (props) => (
      <AdminLayout {...props}>
        <CategoriesForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Appearance",
    path: ROUTE_ADMIN_APPEARANCE,
    component: (props) => (
      <AdminLayout {...props}>
        <Appearance {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Add Shop Slider",
    path: ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_ADD,
    component: (props) => (
      <AdminLayout {...props}>
        <ShopSliderForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Edit Shop Slider",
    path: ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_EDIT,
    component: (props) => (
      <AdminLayout {...props}>
        <ShopSliderForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Add About Slider",
    path: ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_ADD,
    component: (props) => (
      <AdminLayout {...props}>
        <AboutSliderForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Edit About Slider",
    path: ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_EDIT,
    component: (props) => (
      <AdminLayout {...props}>
        <AboutSliderForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Add Blog Slider",
    path: ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_ADD,
    component: (props) => (
      <AdminLayout {...props}>
        <BlogSliderForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Edit Blog Slider",
    path: ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_EDIT,
    component: (props) => (
      <AdminLayout {...props}>
        <BlogSliderForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Associates",
    path: ROUTE_ADMIN_ASSOCIATES,
    component: (props) => (
      <AdminLayout {...props}>
        <Associates {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Blog",
    path: ROUTE_ADMIN_BLOG,
    component: (props) => (
      <AdminLayout {...props}>
        <Blog {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Add Blog",
    path: ROUTE_ADMIN_BLOG_ADD,
    component: (props) => (
      <AdminLayout {...props}>
        <BlogForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Edit Blog",
    path: ROUTE_ADMIN_BLOG_EDIT,
    component: (props) => (
      <AdminLayout {...props}>
        <BlogForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Colors",
    path: ROUTE_ADMIN_COLORS,
    component: (props) => (
      <AdminLayout {...props}>
        <Colors {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Add Colors",
    path: ROUTE_ADMIN_COLORS_ADD,
    component: (props) => (
      <AdminLayout {...props}>
        <ColorsForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Edit Colors",
    path: ROUTE_ADMIN_COLORS_EDIT,
    component: (props) => (
      <AdminLayout {...props}>
        <ColorsForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Contact",
    path: ROUTE_ADMIN_CONTACT,
    component: (props) => (
      <AdminLayout {...props}>
        <Contact {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Reviews",
    path: ROUTE_ADMIN_REVIEWS,
    component: (props) => (
      <AdminLayout {...props}>
        <Reviews {...props} />
      </AdminLayout>
    ),
  },

  {
    name: "Withdrawn",
    path: ROUTE_ADMIN_WITHDRAWN,
    component: (props) => (
      <AdminLayout {...props}>
        <Withdrawn {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "About Product",
    path: ROUTE_ADMIN_ABOUT_PRODUCT,
    component: (props) => (
      <AdminLayout {...props}>
        <AboutProduct {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Add About Product",
    path: ROUTE_ADMIN_ABOUT_PRODUCT_ADD,
    component: (props) => (
      <AdminLayout {...props}>
        <AboutProductForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Edit About Product",
    path: ROUTE_ADMIN_ABOUT_PRODUCT_EDIT,
    component: (props) => (
      <AdminLayout {...props}>
        <AboutProductForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Announcements",
    path: ROUTE_ADMIN_ANNOUNCEMENTS,
    component: (props) => (
      <AdminLayout {...props}>
        <Announcements {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Add Announcements",
    path: ROUTE_ADMIN_ANNOUNCEMENTS_ADD,
    component: (props) => (
      <AdminLayout {...props}>
        <AnnouncementsForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Edit Announcements",
    path: ROUTE_ADMIN_ANNOUNCEMENTS_EDIT,
    component: (props) => (
      <AdminLayout {...props}>
        <AnnouncementsForm {...props} />
      </AdminLayout>
    ),
  },
  {
    name: "Translation",
    path: ROUTE_ADMIN_TRANSLATION,
    component: (props) => (
      <AdminLayout {...props}>
        <Translation {...props} />
      </AdminLayout>
    ),
  },
];

export default routes;
