import { createSelector } from "reselect";
import get from "lodash/get";

export const getUser = (state) => state.user;

export const selectorToken = createSelector(getUser, (item) =>
  get(item, "token")
);
export const selectorUserData = createSelector(getUser, (item) =>
  get(item, "userData")
);
export const selectorShopCategoryList = createSelector(getUser, (item) =>
  get(item, "shopCategoryDataList")
);
