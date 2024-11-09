import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { commonGetQuery } from "../../../utils/axiosInstance";

import LineChartView from "../../../components/Charts/LineChartView";

import { CommonWhiteBackground } from "../../../components/Sections";
import { DashboardContainer } from "./styled";
import { Col, Row } from "react-bootstrap";
import { LoaderContainer } from "../../../components/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [earningsLoading, setEarningsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);

  const { t } = useTranslation();

  const getDashboardData = async () => {
    setLoading(true);

    const response = await commonGetQuery("/dashboard/performance");

    if (response) {
      setDashboardData(response.data);
      setLoading(false);
    }
  };

  const getMonthlyOrders = async () => {
    setOrdersLoading(true);

    const response = await commonGetQuery("/dashboard/monthly-stats/orders");

    if (response) {
      setMonthlyOrders(response.data);
      setOrdersLoading(false);
    }
  };

  const getMonthlyEarnings = async () => {
    setEarningsLoading(true);

    const response = await commonGetQuery("/dashboard/monthly-stats/earnings");

    if (response) {
      setMonthlyEarnings(response.data);
      setEarningsLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
    getMonthlyOrders();
    getMonthlyEarnings();
  }, []);

  return (
    <>
      <DashboardContainer>
        <CommonWhiteBackground className="mt-4">
          <div className="main-title">{t("Performance")}</div>
          <div className="top-todo-list">
            <div className="todo-list-item">
              <div className="title">{t("Total Sales")}</div>
              <div className="value">
                {dashboardData?.brutoEarnings || 0} RSD
              </div>
            </div>
            <div className="todo-list-item">
              <div className="title">{t("Net Sales")}</div>
              <div className="value">
                {dashboardData?.netoEarnings || 0} RSD
              </div>
            </div>
            <div className="todo-list-item">
              <div className="title">{t("Orders")}</div>
              <div className="value">{dashboardData?.totalOrders || 0}</div>
            </div>
          </div>
        </CommonWhiteBackground>

        {loading && <LoaderContainer />}

        <Row>
          <Col md={12}>
            <CommonWhiteBackground className="mt-4">
              <div className="main-title ">{t("Sales This Month")}</div>
              {!ordersLoading && (
                <div className="chart-cover">
                  <LineChartView
                    xAxis={monthlyEarnings?.xAxis}
                    series={monthlyEarnings?.series}
                    label={t("Sales")}
                    labelSuffix={"RSD"}
                  />
                </div>
              )}
            </CommonWhiteBackground>
          </Col>
          <Col md={12}>
            <CommonWhiteBackground className="mt-4">
              <div className="main-title ">{t("Orders This Month")}</div>
              {!earningsLoading && (
                <div className="chart-cover">
                  <LineChartView
                    xAxis={monthlyOrders?.xAxis}
                    series={monthlyOrders?.series}
                    label={t("Orders")}
                  />
                </div>
              )}
            </CommonWhiteBackground>
          </Col>
        </Row>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
