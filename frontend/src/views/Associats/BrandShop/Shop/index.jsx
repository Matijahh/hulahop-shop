import React from "react";
import { connect } from "react-redux";

import BrandShop from "../../../Users/Shop/index";
import { Helmet } from "react-helmet";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const Shop = ({ storeData }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>
          {get(storeData, "name")
            ? `${get(storeData, "name")} - ${t("Shop")}`
            : t("Associate Shop - HulaHop")}
        </title>
      </Helmet>
      <BrandShop isAssociateProduct={true} data={storeData} />
    </div>
  );
};

// export default Shop;

const mapStateToProps = (state) => ({
  storeData: state.user.storeData,
});

export default connect(mapStateToProps, null)(Shop);
