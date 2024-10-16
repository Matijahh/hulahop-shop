import {
  ROUTE_ADMIN_SIGN_IN,
  ROUTE_FORGET_PASSWORD,
  ROUTE_PASSWORD_RESET,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
} from "../routes";

import SignIn from "../../Views/Authentication/SignIn";
import SignUp from "../../Views/Authentication/SignUp";
import PublicLayout from "../../Layouts/PublicLayout";
import AdminSignIn from "../../Views/Admin/Authentication/signIn";
import ForgetPassword from "../../Views/Authentication/ForgetPassword";
import ResetPassword from "../../Views/Authentication/ResetPassword";

const routes = [
  {
    name: "Sign In",
    path: ROUTE_SIGN_IN,
    component: (props) => (
      <PublicLayout {...props}>
        <SignIn {...props} />
      </PublicLayout>
    ),
  },
  {
    name: "Sign Up",
    path: ROUTE_SIGN_UP,
    component: (props) => (
      <PublicLayout {...props}>
        <SignUp {...props} />
      </PublicLayout>
    ),
  },
  {
    name: "Sign Up",
    path: ROUTE_ADMIN_SIGN_IN,
    component: (props) => (
      <PublicLayout {...props}>
        <AdminSignIn {...props} />
      </PublicLayout>
    ),
  },
  {
    name: "Forget Password",
    path: ROUTE_FORGET_PASSWORD,
    component: (props) => (
      <PublicLayout {...props}>
        <ForgetPassword {...props} />
      </PublicLayout>
    ),
  },
  {
    name: "Reset Password",
    path: ROUTE_PASSWORD_RESET,
    component: (props) => (
      <PublicLayout {...props}>
        <ResetPassword {...props} />
      </PublicLayout>
    ),
  },
];

export default routes;
