import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import * as Action from "../../../Redux/actions";
import LineChartView from "../../../components/Charts/LineChartView";
import { CommonWhiteBackground } from "../../../components/Sections";
import { DashboardContainer } from "./styled";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { ACCESS_TOKEN } from "../../../Utils/constant";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Dashboard = (props) => {
  const { userData, saveUserData } = props;
  const { t } = useTranslation();
  const getUserData = async () => {
    if (ACCESS_TOKEN) {
      const decoded = jwtDecode(ACCESS_TOKEN);
      const response = await commonGetQuery(`/users/${decoded.id}`);
      if (response) {
        const { data } = response.data;
        saveUserData(data);
      }
    }
  };

  useEffect(() => {
    if (!userData) {
      getUserData();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("Dashboard - Associate")}</title>
      </Helmet>
      <DashboardContainer>
        <CommonWhiteBackground>
          <div className="main-title">{t("Performance")}</div>
          <div className="top-todo-list">
            <div className="todo-list-item">
              <div className="title">{t("Total Sales")}</div>
              <div className="value">0 Din</div>
            </div>
            <div className="todo-list-item">
              <div className="title">{t("Net Sales")}</div>
              <div className="value">0 Din</div>
            </div>
            <div className="todo-list-item">
              <div className="title">{t("Orders")}</div>
              <div className="value">0</div>
            </div>
            <div className="todo-list-item">
              <div className="title">{t("Products Sold")}</div>
              <div className="value">0</div>
            </div>
          </div>
        </CommonWhiteBackground>
        <CommonWhiteBackground className="mt-4">
          <div className="main-title ">{t("Graphs")}</div>
          <div className="chart-cover">
            <LineChartView />
          </div>
        </CommonWhiteBackground>
        <Row className="mt-4">
          <Col md={12} lg={6} sm={12}>
            <CommonWhiteBackground>
              <div className="main-title ">
                {t("Top Category's - Item Sold")}
              </div>
              <div className="info-list">
                <div className="info-item">
                  <div className="image-cover">
                    <img src="https://picsum.photos/seed/picsum/70/70" />
                  </div>
                  <div className="right">
                    <div className="title">Bag</div>
                    <div className="description">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloribus, rem.
                    </div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="image-cover">
                    <img src="https://picsum.photos/seed/picsum/70/70" />
                  </div>
                  <div className="right">
                    <div className="title">Bag</div>
                    <div className="description">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloribus, rem.
                    </div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="image-cover">
                    <img src="https://picsum.photos/seed/picsum/70/70" />
                  </div>
                  <div className="right">
                    <div className="title">Bag</div>
                    <div className="description">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloribus, rem.
                    </div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="image-cover">
                    <img src="https://picsum.photos/seed/picsum/70/70" />
                  </div>
                  <div className="right">
                    <div className="title">Bag</div>
                    <div className="description">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloribus, rem.
                    </div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="image-cover">
                    <img src="https://picsum.photos/seed/picsum/70/70" />
                  </div>
                  <div className="right">
                    <div className="title">Bag</div>
                    <div className="description">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloribus, rem.
                    </div>
                  </div>
                </div>
              </div>
            </CommonWhiteBackground>
          </Col>
          <Col md={12} lg={6} sm={12} className="top-product-col">
            <CommonWhiteBackground>
              <div className="main-title ">{t("Top products - Item Sold")}</div>
              <div className="info-list">
                <div className="info-item">
                  <div className="image-cover">
                    <img src="https://picsum.photos/seed/picsum/70/70" />
                  </div>
                  <div className="right">
                    <div className="title">Bag</div>
                    <div className="description">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloribus, rem.
                    </div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="image-cover">
                    <img src="https://picsum.photos/seed/picsum/70/70" />
                  </div>
                  <div className="right">
                    <div className="title">Bag</div>
                    <div className="description">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloribus, rem.
                    </div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="image-cover">
                    <img src="https://picsum.photos/seed/picsum/70/70" />
                  </div>
                  <div className="right">
                    <div className="title">Bag</div>
                    <div className="description">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloribus, rem.
                    </div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="image-cover">
                    <img src="https://picsum.photos/seed/picsum/70/70" />
                  </div>
                  <div className="right">
                    <div className="title">Bag</div>
                    <div className="description">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloribus, rem.
                    </div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="image-cover">
                    <img src="https://picsum.photos/seed/picsum/70/70" />
                  </div>
                  <div className="right">
                    <div className="title">Bag</div>
                    <div className="description">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloribus, rem.
                    </div>
                  </div>
                </div>
              </div>
            </CommonWhiteBackground>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6} lg={6} sm={12}>
            <CommonWhiteBackground>
              <div className="main-title ">{t("Latest Announcement")}</div>
              <div className="anouncement-card">
                <div className="image-cover">
                  <img src="https://picsum.photos/seed/picsum/70/70" />
                </div>
                <div className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                  provident numquam possimus, vitae odit, aspernatur autem
                  minima similique quaerat nesciunt dolor voluptatem enim totam
                  temporibus vel doloremque. Delectus, voluptatum dolore...
                  <span>Read More.</span>
                </div>
              </div>
            </CommonWhiteBackground>
          </Col>
        </Row>
      </DashboardContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = {
  saveUserData: (data) => Action.saveUserData(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
