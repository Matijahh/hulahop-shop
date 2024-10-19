import AuthRoutes from "./Modules/authRoute";
import UserRoutes from "./Modules/usersRoutes";
import AssociatesRoute from "./Modules/associatesRoute";
import AssociatesBrandShopRoute from "./Modules/associatesStoreRoutes";
import AdminRoutes from "./Modules/adminRoutes";
import PublicRoutes from "./Modules/publicRoute";
import { getUserToken, getUserType } from "../utils/commonFunctions";

const Role = getUserType();
const Token = getUserToken();

const renderRoute = () => {
  if (Token && Role) {
    switch (Role) {
      case "ADMIN":
        return [
          ...AdminRoutes,
          ...AssociatesBrandShopRoute,
          ...UserRoutes,
          ...PublicRoutes,
        ];
      case "ASSOCIATE":
        return [
          ...AssociatesRoute,
          ...AssociatesBrandShopRoute,
          ...PublicRoutes,
          ...UserRoutes,
        ];
      default:
        return [
          ...AuthRoutes,
          ...AssociatesBrandShopRoute,
          ...UserRoutes,
          ...PublicRoutes,
        ];
    }
  } else {
    return [
      ...AuthRoutes,
      ...UserRoutes,
      ...AssociatesBrandShopRoute,
      ...PublicRoutes,
    ];
  }
};
const indexRoutes = renderRoute();

export default indexRoutes;
