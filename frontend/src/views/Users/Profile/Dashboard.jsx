import React, { useEffect, useState } from "react";
import ProfileComponent from ".";
import ButtonComponent from "../../../components/ButtonComponent";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { jwtDecode } from "jwt-decode";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ASSOCIATE_MAIN_DASHBOARD,
} from "../../../routes/routes";

const Dashboard = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const getUserData = async () => {
    const decoded = jwtDecode(ACCESS_TOKEN);
    setLoading(true);
    const response = await commonGetQuery(`/users/${decoded.id}`);
    setLoading(false);
    if (response) {
      const { data } = response.data;

      setUserData(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleDashboard = () => {
    if (userData?.type === "ADMIN") {
      navigate(ROUTE_ADMIN_DASHBOARD);
    }

    if (userData?.type === "ASSOCIATE") {
      navigate(ROUTE_ASSOCIATE_MAIN_DASHBOARD);
    }
  };

  return (
    <ProfileComponent>
      <Helmet>
        <title>{t("Dashboard - HulaHop")}</title>
      </Helmet>
      <div className="deshboard-box">
        <div className="user-description">
          <h6>Hello {get(userData, "first_name", "")}</h6>
          <p>
            {t(
              "In your user account control panel, you can view your recent orders , manage your shipping and billing address , and change your password and account information."
            )}
          </p>
        </div>

        <div className="vendor-box">
          <div className="vendor-flexbox">
            <div className="vendor-desc">
              <h6>{t("Become a Vendor")}</h6>
              <p>
                {t(
                  "Vendors can sell products and manage a store with a vendor dashboard."
                )}
              </p>
            </div>
            <div className="vendor-btn-box">
              <ButtonComponent
                text={t("Go to Dashboard")}
                variant="contained"
                className="vendor-btn"
                onClick={() => handleDashboard()}
              />
            </div>
          </div>
        </div>
      </div>
    </ProfileComponent>
  );
};

export default Dashboard;
