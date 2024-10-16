import React, { useEffect, useState } from "react";
import { AssociatsStoreLayoutContainer } from "./styled";
import Header from "./Header";
import Footer from "../PrivateLayout/Footer";
import * as Action from "../../Redux/actions";
import { commonGetQuery } from "../../utils/axiosInstance";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { LoaderContainer } from "../../components/Loader";

const AssociatsStoreLayout = (props) => {
  const { children, saveAssociateStoreData, storeData } = props;
  const { id, sId } = useParams();

  const [loading, setLoading] = useState(false);

  const getStoreData = async () => {
    setLoading(true);
    const response = await commonGetQuery(
      `/store_layout_details/${(sId || id)?.split("-")?.[1]}`
    );
    setLoading(false);
    if (response) {
      const { data } = response.data;
      saveAssociateStoreData(data);
    }
  };

  useEffect(() => {
    if (!storeData) {
      getStoreData();
    }
  }, []);

  return (
    <AssociatsStoreLayoutContainer>
      {loading ? (
        <LoaderContainer />
      ) : (
        <>
          <Header />
          <div className="main-container page-wrapper">{children}</div>
          <Footer />
        </>
      )}
    </AssociatsStoreLayoutContainer>
  );
};

const mapStateToProps = (state) => ({
  storeData: state.user.storeData,
});

const mapDispatchToProps = {
  saveAssociateStoreData: (data) => Action.saveAssociateStoreData(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssociatsStoreLayout);
