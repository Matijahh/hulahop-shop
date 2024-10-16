import { lazy } from "react";
import {
  ROUTE_MAIN_TERMS_OF_USE,
  ROUTE_PRIVACY_POLICY,
  ROUTE_RETURN_POLICY,
} from "../routes";
import PrivateLayout from "../../Layouts/PrivateLayout";

const TermsOfUse = lazy(() => import("../../Views/Users/TermsOfUse"));
const ReturnPolicy = lazy(() => import("../../Views/Users/ReturnPolicy"));
const PrivacyPolicy = lazy(() => import("../../Views/Users/PrivacyPolicy"));

const routes = [
  {
    name: "ChangePassword",
    path: ROUTE_MAIN_TERMS_OF_USE,
    component: (props) => (
      <PrivateLayout {...props}>
        <TermsOfUse {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "ChangePassword",
    path: ROUTE_RETURN_POLICY,
    component: (props) => (
      <PrivateLayout {...props}>
        <ReturnPolicy {...props} />
      </PrivateLayout>
    ),
  },
  {
    name: "ChangePassword",
    path: ROUTE_PRIVACY_POLICY,
    component: (props) => (
      <PrivateLayout {...props}>
        <PrivacyPolicy {...props} />
      </PrivateLayout>
    ),
  },
];

export default routes;
