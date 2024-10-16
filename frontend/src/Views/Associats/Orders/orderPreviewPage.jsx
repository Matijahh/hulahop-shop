import React from "react";
import { CommonWhiteBackground } from "../../../components/Sections";
import { OrderPreviewPageContainer } from "./styled";
import GobackButton from "../../../components/GoBackButton";

const OrderPreviewPage = () => {
  return (
    <CommonWhiteBackground>
      <div className="main-title mb-4">Orders Preview</div>
      <GobackButton />
      <OrderPreviewPageContainer>
        <table>
          <tr>
            <td className="title">No.</td>
            <td className="title">Image</td>
            <td className="title product-detail">Description</td>
            <td className="title">Quantity</td>
            <td className="title">Order Value</td>
            <td className="title">Commission</td>
            <td className="title">Actual Value</td>
          </tr>
          {[1, 2, 3].map((item, index) => (
            <tr>
              <td className="body-cell">{index + 1}</td>
              <td className="body-cell">
                <div className="product-image">
                  <img src="https://picsum.photos/seed/picsum/200/200" />
                </div>
              </td>
              <td className="body-cell product-detail">
                <div className="product-data">
                  <div className="product-name">This is demo product</div>
                  <div className="product-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dicta pariatur minus perspiciatis deserunt facilis
                    distinctio autem laboriosam? Odit, eveniet reprehenderit.
                  </div>
                </div>
              </td>
              <td className="body-cell" width={"10%"}>
                X 1
              </td>
              <td className="body-cell" width={"10%"}>
                1200 RSD
              </td>
              <td className="body-cell" width={"10%"}>
                200 RSD
              </td>
              <td className="body-cell" width={"12%"}>
                1000 RSD
              </td>
            </tr>
          ))}
        </table>
      </OrderPreviewPageContainer>
    </CommonWhiteBackground>
  );
};

export default OrderPreviewPage;
