import { useTranslation } from "react-i18next";

import LineChartView from "../../../components/Charts/LineChartView";

import { CommonWhiteBackground } from "../../../components/Sections";
import { DashboardContainer } from "./styled";
import { Col, Row } from "react-bootstrap";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <>
      <DashboardContainer>
        {/* <CommonWhiteBackground>
          <div className="main-title">{t("To do")}</div>
          <div className="top-todo-list">
            <div className="todo-list-item">
              <div className="title">{t("Pending Orders")}</div>
              <div className="value">0</div>
            </div>
            <div className="todo-list-item">
              <div className="title">{t("Download Labels")}</div>
              <div className="value">0</div>
            </div>
            <div className="todo-list-item">
              <div className="title">{t("Out of Stock")}</div>
              <div className="value">0</div>
            </div>
            <div className="todo-list-item">
              <div className="title">{t("Low of Stock")}</div>
              <div className="value">0</div>
            </div>
          </div>
        </CommonWhiteBackground> */}
        <CommonWhiteBackground className="mt-4">
          <div className="main-title">{t("Performance")}</div>
          <div className="top-todo-list">
            <div className="todo-list-item">
              <div className="title">{t("Total Sales")}</div>
              <div className="value">0 RSD</div>
            </div>
            <div className="todo-list-item">
              <div className="title">{t("Net Sales")}</div>
              <div className="value">0 RSD</div>
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

        <Row>
          <Col sm={12} md={6}>
            <CommonWhiteBackground className="mt-4">
              <div className="main-title ">{t("Sales This Month")}</div>
              <div className="chart-cover">
                <LineChartView />
              </div>
            </CommonWhiteBackground>
          </Col>
          <Col sm={12} md={6}>
            <CommonWhiteBackground className="mt-4">
              <div className="main-title ">{t("Orders This Month")}</div>
              <div className="chart-cover">
                <LineChartView />
              </div>
            </CommonWhiteBackground>
          </Col>
        </Row>
        {/* <Row className="mt-4">
          <Col>
            <CommonWhiteBackground>
              <div className="main-title ">
                {t("Top Categories - Items Sold")}
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
          <Col>
            <CommonWhiteBackground>
              <div className="main-title ">
                {t("Top Products - Items Sold")}
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
        </Row> */}
        {/* <Row className="mt-4">
          <Col md={6} lg={6} sm={12}>
            <CommonWhiteBackground>
              <div className="main-title ">{t("Latest Announcements")}</div>
              <div className="anouncement-card">
                <div className="image-cover">
                  <img src="https://picsum.photos/seed/picsum/70/70" />
                </div>
                <div className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                  provident numquam possimus, vitae odit, aspernatur autem
                  minima similique quaerat nesciunt dolor voluptatem enim totam
                  temporibus vel doloremque. Delectus, voluptatum dolore...
                  <span>{t("Read More")}</span>
                </div>
              </div>
            </CommonWhiteBackground>
          </Col>
        </Row> */}
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
