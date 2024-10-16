import {
  ROUTE_MAIN,
  ROUTE_MAIN_SHOP,
  ROUTE_MAIN_ABOUT_PLATFORM,
  ROUTE_MAIN_DESIGN_IT_YOUR_SELF,
  ROUTE_MAIN_ABOUT_PRODUCT,
  ROUTE_MAIN_ASSOCIETS,
  ROUTE_MAIN_BLOG,
  ROUTE_MAIN_CONTACT,
  ROUTE_MAIN_CART,
  ROUTE_MAIN_CHECKOUT,
  ROUTE_MAIN_SHOP_PRODUCT,
  ROUTE_MAIN_BLOG_SINGLE,
  ROUTE_MAIN_PROFILE,
  ROUTE_MAIN_DASHBOARD,
  ROUTE_MAIN_CHANGE_PASSWORD,
  ROUTE_MAIN_WISHLIST,
  ROUTE_MAIN_ORDERS,
  ROUTE_MAIN_INSTRUCTIONS,
} from "../routes";

import PrivateLayout from "../../Layouts/PrivateLayout";
import HomePage from "../../Views/Users/HomePage";
import Shop from "../../Views/Users/Shop";
import SingleProduct from "../../Views/Users/Shop/SingleProduct";
import Associates from "../../Views/Users/Associates";
import AboutPlatForm from "../../Views/Users/AboutPlatForm";
import DesignItYourSelf from "../../Views/Users/DesignItYourSelf";
import AboutProducts from "../../Views/Users/AboutProducts";
import Instructions from "../../Views/Users/Instructions";
import Blog from "../../Views/Users/Blog";
import BlogPage from "../../Views/Users/Blog/BlogPage";
import Contact from "../../Views/Users/Contact";
import Cart from "../../Views/Users/Cart";
import CheckOut from "../../Views/Users/CheckOut";
import Dashboard from "../../Views/Users/Profile/Dashboard";
import Orders from "../../Views/Users/Profile/Orders";
import Profile from "../../Views/Users/Profile/Profile";
import Wishlist from "../../Views/Users/Profile/Wishlist";
import ChangePassword from "../../Views/Users/Profile/ChangePassword";

const routes = [
  {
    name: "HomePage",
    path: ROUTE_MAIN,
    component: (props) => (
      <PrivateLayout {...props}>
        <HomePage {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "Shop",
    path: ROUTE_MAIN_SHOP,
    component: (props) => (
      <PrivateLayout {...props}>
        <Shop {...props} isAssociateProduct={false} />
      </PrivateLayout>
    ),
  },
  {
    name: "Single Product",
    path: ROUTE_MAIN_SHOP_PRODUCT,
    component: (props) => (
      <PrivateLayout {...props}>
        <SingleProduct {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "Associates",
    path: ROUTE_MAIN_ASSOCIETS,
    component: (props) => (
      <PrivateLayout {...props}>
        <Associates {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "AboutPlatForm",
    path: ROUTE_MAIN_ABOUT_PLATFORM,
    component: (props) => (
      <PrivateLayout {...props}>
        <AboutPlatForm {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "DesignItYourSelf",
    path: ROUTE_MAIN_DESIGN_IT_YOUR_SELF,
    component: (props) => (
      <PrivateLayout {...props}>
        <DesignItYourSelf {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "AboutProducts",
    path: ROUTE_MAIN_ABOUT_PRODUCT,
    component: (props) => (
      <PrivateLayout {...props}>
        <AboutProducts {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "Blog",
    path: ROUTE_MAIN_INSTRUCTIONS,
    component: (props) => (
      <PrivateLayout {...props}>
        <Instructions {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "Blog",
    path: ROUTE_MAIN_BLOG,
    component: (props) => (
      <PrivateLayout {...props}>
        <Blog {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "BlogPage",
    path: ROUTE_MAIN_BLOG_SINGLE,
    component: (props) => (
      <PrivateLayout {...props}>
        <BlogPage {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "Contact",
    path: ROUTE_MAIN_CONTACT,
    component: (props) => (
      <PrivateLayout {...props}>
        <Contact {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "Cart",
    path: ROUTE_MAIN_CART,
    component: (props) => (
      <PrivateLayout {...props}>
        <Cart {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "CheckOut",
    path: ROUTE_MAIN_CHECKOUT,
    component: (props) => (
      <PrivateLayout {...props}>
        <CheckOut {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "Dashboard",
    path: ROUTE_MAIN_DASHBOARD,
    component: (props) => (
      <PrivateLayout {...props}>
        <Dashboard {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "Orders",
    path: ROUTE_MAIN_ORDERS,
    component: (props) => (
      <PrivateLayout {...props}>
        <Orders {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "Profile",
    path: ROUTE_MAIN_PROFILE,
    component: (props) => (
      <PrivateLayout {...props}>
        <Profile {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "Wishlist",
    path: ROUTE_MAIN_WISHLIST,
    component: (props) => (
      <PrivateLayout {...props}>
        <Wishlist {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "ChangePassword",
    path: ROUTE_MAIN_CHANGE_PASSWORD,
    component: (props) => (
      <PrivateLayout {...props}>
        <ChangePassword {...props} />
      </PrivateLayout>
    ),
  },
];

export default routes;
