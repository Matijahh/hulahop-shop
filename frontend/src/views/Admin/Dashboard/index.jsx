import React from "react";

import LineChartView from "../../../components/Charts/LineChartView";
import { CommonWhiteBackground } from "../../../components/Sections";
import { DashboardContainer } from "./styled";
import { Col, Row } from "react-bootstrap";

const Dashboard = () => {
  return (
    <>
      <DashboardContainer>
        <CommonWhiteBackground>
          <div className="main-title">To do</div>
          <div className="top-todo-list">
            <div className="todo-list-item">
              <div className="title">Panding Orders</div>
              <div className="value">0 </div>
            </div>
            <div className="todo-list-item">
              <div className="title">Download Lebels</div>
              <div className="value">0</div>
            </div>
            <div className="todo-list-item">
              <div className="title">Out of stock</div>
              <div className="value">0</div>
            </div>
            <div className="todo-list-item">
              <div className="title">Low of stock</div>
              <div className="value">0</div>
            </div>
          </div>
        </CommonWhiteBackground>
        <CommonWhiteBackground className="mt-4">
          <div className="main-title">Performance</div>
          <div className="top-todo-list">
            <div className="todo-list-item">
              <div className="title">Total Sales</div>
              <div className="value">0 Din</div>
            </div>
            <div className="todo-list-item">
              <div className="title">Net Sales</div>
              <div className="value">0 Din</div>
            </div>
            <div className="todo-list-item">
              <div className="title">Orders</div>
              <div className="value">0</div>
            </div>
            <div className="todo-list-item">
              <div className="title">Products Sold</div>
              <div className="value">0</div>
            </div>
          </div>
        </CommonWhiteBackground>

        <Row>
          <Col>
            <CommonWhiteBackground className="mt-4">
              <div className="main-title ">Sales This Month</div>
              <div className="chart-cover">
                <LineChartView />
              </div>
            </CommonWhiteBackground>
          </Col>
          <Col>
            <CommonWhiteBackground className="mt-4">
              <div className="main-title ">Orders This Month</div>
              <div className="chart-cover">
                <LineChartView />
              </div>
            </CommonWhiteBackground>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <CommonWhiteBackground>
              <div className="main-title ">Top Categorys - Item Sold</div>
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
              <div className="main-title ">Top products - Item Sold</div>
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
              <div className="main-title ">Latest Announcement</div>
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

export default Dashboard;
