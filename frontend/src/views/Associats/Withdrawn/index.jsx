import React, { useEffect, useState } from "react";
import Tables from "../../../components/SuperAdmin/Tables";
import PaymentIcon from "@mui/icons-material/Payment";
import { Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import get from "lodash/get";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { RequestWithdrawalContainer } from "./styled";
import RequestWithdrawal from "./requestWithdrawal";
import ButtonComponent from "../../../components/ButtonComponent";
import store from "../../../utils/store";
import { connect } from "react-redux";
import { Loader } from "../../../components/Loader";
import { commonGetQuery } from "../../../utils/axiosInstance";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Withdrawn = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const header = [
    { field: "id", headerName: t("ID"), width: 100 },
    {
      field: "requested_amount",
      headerName: t("Requested Amount"),
      width: 250,
    },
    { field: "requested_date", headerName: t("Requested Date"), width: 300 },
    { field: "status", headerName: t("Status"), width: 200 },
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [loading, setLoading] = useState(false);
  const [tableList, setTableList] = useState([]);
  const [wallet, setWallet] = useState("0.00");

  const getAssociateBalance = async () => {
    const decoded = jwtDecode(ACCESS_TOKEN);
    const response = await commonGetQuery(`/associates/${decoded.id}`);
    if (response && response.status === 200) {
      const { data } = response.data;
      setWallet(data.wallet);
    }
  };
  const getWithdrawn = async () => {
    setLoading(true);
    const response = await commonGetQuery("/associate_withdrawn_request");
    setLoading(false);
    if (response) {
      const { data } = response.data;
      const modifiedData = data.map((item) => {
        return {
          id: item.id,
          requested_amount: item.amount,
          requested_date: moment(Number(get(item, "created_at", ""))).format(
            "DD/MM/YYYY"
          ),
          status: item.status ? "Done" : "in Progress",
        };
      });
      setTableList(modifiedData);
    }
  };

  useEffect(() => {
    getWithdrawn();
    getAssociateBalance();
  }, []);

  return (
    <CommonWhiteBackground>
      <Helmet>
        <title>{t("Withdrawal - Associate")}</title>
      </Helmet>
      <RequestWithdrawalContainer>
        <FlexBox className="mb-4" isWrap>
          <div className="main-title ">{t("Withdrawal")}</div>
          <FlexBox>
            <div className="withdrawal-value">{`${wallet}`} RSD</div>
            <ButtonComponent
              variant="contained"
              startIcon={<AddIcon />}
              text={t("Withdrawn Now!")}
              onClick={handleToggle}
            />
          </FlexBox>
        </FlexBox>
        {loading ? <Loader /> : <Tables body={tableList} header={header} />}
        {isOpen && (
          <RequestWithdrawal
            userData={userData}
            isOpen={isOpen}
            toggle={handleToggle}
            refresh={getWithdrawn}
            wallet={wallet}
          />
        )}
      </RequestWithdrawalContainer>
    </CommonWhiteBackground>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps, null)(Withdrawn);
